import { Router } from "express";
import { body } from "express-validator";
import { register, login, me } from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post(
  "/register",
  body("name").isString().notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("role").optional().isIn(["PATIENT", "DOCTOR"]),
  register
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isString().notEmpty(),
  login
);

router.get("/me", auth(), me);

export default router;