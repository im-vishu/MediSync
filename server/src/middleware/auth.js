import { verifyJwt } from "../utils/jwt.js";

// Role-based auth middleware
export function auth(requiredRole = null) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace(/^Bearer\s+/, "");

    if (!token) return res.status(401).json({ error: "No token" });

    try {
      const decoded = verifyJwt(token);
      req.user = decoded;
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ error: "Forbidden: insufficient role" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
}