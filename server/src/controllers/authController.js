import bcrypt from "bcrypt";
import { PrismaClient, Role } from "@prisma/client";
import { validationResult } from "express-validator";
import { signJwt } from "../utils/jwt.js";

const prisma = new PrismaClient();

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, role, doctor } = req.body;

  try {
    // Check for existing email
    if (await prisma.user.findUnique({ where: { email } }))
      return res.status(409).json({ error: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);

    let userData = {
      name,
      email,
      password: hash,
      role: role || "PATIENT"
    };

    // If registering as doctor
    if (userData.role === "DOCTOR") {
      // Require doctor info
      if (!doctor || !doctor.licenseNo || !doctor.specializationId)
        return res.status(400).json({ error: "Doctor info required" });

      // Create user, then link Doctor profile
      const user = await prisma.user.create({ data: userData });
      await prisma.doctor.create({
        data: {
          licenseNo: doctor.licenseNo,
          specializationId: doctor.specializationId,
          userId: user.id
        }
      });

      return res.json({ message: "Doctor registered, pending admin approval" });
    }

    // Default: patient register
    await prisma.user.create({ data: userData });
    res.json({ message: "Registration successful" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email }, include: { doctor: true } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: "Invalid credentials" });

    // If doctor, check approval
    if (user.role === "DOCTOR" && user.doctor && !user.doctor.approved)
      return res.status(403).json({ error: "Doctor not approved by admin yet" });

    const token = signJwt({ id: user.id, role: user.role, email: user.email });
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function me(req, res) {
  try {
    const { id } = req.user;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}