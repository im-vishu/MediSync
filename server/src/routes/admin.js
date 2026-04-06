import { Router } from "express";
import { body, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { auth } from "../middleware/auth.js";
import { sendMail } from "../utils/email.js";

const router = Router();
const prisma = new PrismaClient();

// All admin endpoints are protected
router.use(auth("ADMIN"));

/** List all doctors (with user & spec info) */
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        user: true,
        specialization: true
      },
      orderBy: { id: 'asc' }
    });
    res.json({ doctors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** Approve or reject a doctor, send email notification */
router.post(
  "/doctors/:doctorId/approve",
  body("approved").isBoolean(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const doctorId = Number(req.params.doctorId);
    const { approved } = req.body;

    try {
      const doctor = await prisma.doctor.update({
        where: { id: doctorId },
        data: { approved },
        include: { user: true, specialization: true }
      });

      // Send approval/rejection email
      try {
        await sendMail({
          to: doctor.user.email,
          subject: approved
            ? "MediSync Doctor Approval"
            : "MediSync Doctor Application — Rejected",
          text: approved
            ? `Dear ${doctor.user.name}, your MediSync doctor profile is now approved. You can begin adding appointments and slots.`
            : `Dear ${doctor.user.name}, unfortunately your application was not accepted. Please contact admin for more info.`
        });
      } catch (e) {
        // Log but do not block
        console.error("Email send error:", e.message);
      }

      res.json({
        doctor,
        message: `Doctor has been ${approved ? "approved" : "rejected"} and notified by email.`
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/** List all users */
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: 'asc' }
    });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** List all appointments, with patient, slot, doctor detail */
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        slot: true,
        patient: true,
        doctor: { include: { user: true, specialization: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** Admin analytics/stats: user, doctor, appointment counts */
router.get("/stats", async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const doctorCount = await prisma.doctor.count();
    const patientCount = await prisma.user.count({ where: { role: "PATIENT" } });
    const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
    const appointmentCount = await prisma.appointment.count();
    const byStatus = await prisma.appointment.groupBy({
      by: ['status'],
      _count: { status: true }
    });

    res.json({
      userCount,
      doctorCount,
      patientCount,
      adminCount,
      appointmentCount,
      appointmentsByStatus: byStatus
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;