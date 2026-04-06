import { Router } from "express";
import { body, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { auth } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

// Patient books a slot
router.post(
  "/book",
  auth("PATIENT"),
  body("slotId").isInt(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const slotId = req.body.slotId;
      const patientId = req.user.id;

      const slot = await prisma.slot.findUnique({ where: { id: slotId } });
      if (!slot || slot.booked) return res.status(400).json({ error: "Slot not available" });

      const appointment = await prisma.appointment.create({
        data: {
          slotId: slot.id,
          patientId,
          doctorId: slot.doctorId,
          status: "PENDING",
        }
      });
      // Mark slot as booked
      await prisma.slot.update({ where: { id: slot.id }, data: { booked: true } });

      res.json({ message: "Appointment booked!", appointment });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Patient views their appointments
router.get("/mine", auth("PATIENT"), async (req, res) => {
  const patientId = req.user.id;
  const appointments = await prisma.appointment.findMany({
    where: { patientId },
    include: { slot: true, doctor: { include: { user: true } } }
  });
  res.json({ appointments });
});

// Doctor views their appointments
router.get("/my-patients", auth("DOCTOR"), async (req, res) => {
  const doc = await prisma.doctor.findUnique({ where: { userId: req.user.id } });
  if (!doc) return res.status(403).json({ error: "Not a doctor" });
  const appointments = await prisma.appointment.findMany({
    where: { doctorId: doc.id },
    include: { slot: true, patient: true }
  });
  res.json({ appointments });
});

export default router;