import { PrismaClient } from "@prisma/client";
import { sendMail } from "../utils/email.js";

const prisma = new PrismaClient();

// PATIENT books an appointment for a slot
export async function bookAppointment(req, res) {
  try {
    const slotId = req.body.slotId;
    const patientId = req.user.id;

    // Get slot and check if available
    const slot = await prisma.slot.findUnique({ where: { id: slotId }, include: { doctor: { include: { user: true } } } });
    if (!slot) return res.status(404).json({ error: "Slot not found" });
    if (slot.booked) return res.status(400).json({ error: "Slot already booked" });
    if (new Date(slot.startTime) < new Date()) return res.status(400).json({ error: "Cannot book a past slot" });

    const appointment = await prisma.appointment.create({
      data: {
        slotId: slot.id,
        patientId,
        doctorId: slot.doctorId,
        status: "PENDING"
      },
      include: {
        doctor: { include: { user: true } },
        slot: true,
        patient: true
      }
    });

    // Mark slot as booked
    await prisma.slot.update({ where: { id: slot.id }, data: { booked: true, appointment: { connect: { id: appointment.id } } } });

    // Send email to patient
    try {
      await sendMail({
        to: appointment.patient.email,
        subject: "Appointment Confirmation",
        text: `Hi ${appointment.patient.name}, your appointment with Dr. ${appointment.doctor.user.name} at ${appointment.slot.startTime} is booked.`,
        html: `<p>Dear ${appointment.patient.name},<br>Your appointment with <b>Dr. ${appointment.doctor.user.name}</b> on <b>${new Date(appointment.slot.startTime).toLocaleString()}</b> is confirmed.</p>`
      });
    } catch (_) { /* Email failure doesn't block booking */ }

    res.json({ message: "Appointment booked!", appointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PATIENT views their appointments
export async function getMyAppointments(req, res) {
  try {
    const patientId = req.user.id;
    const appointments = await prisma.appointment.findMany({
      where: { patientId },
      include: { slot: true, doctor: { include: { user: true } } }
    });
    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DOCTOR views all their appointments
export async function getDoctorAppointments(req, res) {
  try {
    const doctor = await prisma.doctor.findUnique({ where: { userId: req.user.id } });
    if (!doctor) return res.status(403).json({ error: "Not a doctor" });

    const appointments = await prisma.appointment.findMany({
      where: { doctorId: doctor.id },
      include: { slot: true, patient: true }
    });
    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DOCTOR or ADMIN updates appointment status
export async function updateAppointmentStatus(req, res) {
  try {
    const appointmentId = Number(req.params.appointmentId);
    const { status } = req.body;
    const user = req.user;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        doctor: { include: { user: true } },
        patient: true,
        slot: true
      }
    });
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    // Only admin, or doctor for their own appointment
    if (
      user.role !== "ADMIN" &&
      !(user.role === "DOCTOR" && appointment.doctor.userId === user.id)
    ) {
      return res.status(403).json({ error: "Not allowed" });
    }

    // Update status
    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status }
    });

    // If CANCELLED, free the slot
    if (status === "CANCELLED") {
      await prisma.slot.update({ where: { id: appointment.slotId }, data: { booked: false } });
    }

    // Send notification emails
    try {
      // Notify patient
      await sendMail({
        to: appointment.patient.email,
        subject: `Appointment ${status}`,
        text: `Hi ${appointment.patient.name}, your appointment on ${appointment.slot.startTime} is now ${status}.`
      });
      // Notify doctor
      await sendMail({
        to: appointment.doctor.user.email,
        subject: `Appointment ${status}`,
        text: `Appointment with patient ${appointment.patient.name} on ${appointment.slot.startTime} is now ${status}.`
      });
    } catch (_) {}

    res.json({ appointment: updated, message: `Status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}