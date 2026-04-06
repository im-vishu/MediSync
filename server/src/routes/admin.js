import { Router } from "express";
import { body, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { auth } from "../middleware/auth.js";

const router = Router();
const prisma = new PrismaClient();

// Only Admin can access these routes!
router.use(auth("ADMIN"));

// List all doctors (pending or not)
router.get("/doctors", async (req, res) => {
  const doctors = await prisma.doctor.findMany({
    include: { user: true, specialization: true }
  });
  res.json({ doctors });
});

// Approve/reject a doctor
router.post(
  "/doctors/:doctorId/approve",
  body("approved").isBoolean(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const doctorId = Number(req.params.doctorId);
    const { approved } = req.body;
    const doctor = await prisma.doctor.update({
      where: { id: doctorId },
      data: { approved },
      include: { user: true, specialization: true }
    });
    res.json({ doctor, message: `Doctor ${approved ? "approved" : "rejected"}` });
  }
);

// List all users
router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ users });
});

// List all appointments
router.get("/appointments", async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    include: {
      doctor: { include: { user: true } },
      patient: true,
      slot: true
    },
    orderBy: { createdAt: "desc" }
  });
  res.json({ appointments });
});

export default router;