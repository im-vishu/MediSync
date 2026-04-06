import { Router } from "express";
import { body, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { auth } from "../middleware/auth.js";

import adminRoutes from './admin.js';



const router = Router();
const prisma = new PrismaClient();

// Doctor creates slot(s)
router.post(
  "/",
  auth("DOCTOR"),
  body("slots").isArray({ min: 1 }),
  body("slots.*.startTime").isISO8601(),
  body("slots.*.endTime").isISO8601(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const doctorId = req.user.id; // user's id
    const doctor = await prisma.doctor.findUnique({ where: { userId: doctorId } });
    if (!doctor) return res.status(403).json({ error: "Doctor not found or not approved" });
    if (!doctor.approved) return res.status(403).json({ error: "Doctor not approved" });

    try {
      const slotData = req.body.slots.map((slot) => ({
        doctorId: doctor.id,
        startTime: new Date(slot.startTime),
        endTime: new Date(slot.endTime),
      }));
      const newSlots = await prisma.slot.createMany({ data: slotData });
      res.json({ message: `Created ${newSlots.count} slots` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// List own slots (doctor)
router.get("/mine", auth("DOCTOR"), async (req, res) => {
  const doctor = await prisma.doctor.findUnique({ where: { userId: req.user.id } });
  if (!doctor) return res.status(403).json({ error: "Not a doctor" });
  const slots = await prisma.slot.findMany({ where: { doctorId: doctor.id } });
  res.json({ slots });
});

// List available slots for a doctor (for patients)
router.get("/doctor/:doctorId", auth(), async (req, res) => {
  const doctorId = Number(req.params.doctorId);
  const slots = await prisma.slot.findMany({
    where: { doctorId, booked: false, startTime: { gte: new Date() } },
    orderBy: { startTime: "asc" },
  });
  res.json({ slots });
});

router.use("/admin", adminRoutes);

export default router;