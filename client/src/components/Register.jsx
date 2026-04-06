import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT", // Default role
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      
      // If you want to auto-login:
      login({ ...data.user, token: data.token });
      // Redirect based on role
      const to = {
        ADMIN: "/admin/dashboard",
        DOCTOR: "/doctor/dashboard",
        PATIENT: "/patient/dashboard"
      }[data.user.role] || "/profile";
      navigate(to);

      // If you want to require manual login instead, comment out login() and navigate(), and show a success message instead:
      // setSuccess("Registered successfully! Please login.");
      // navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white rounded shadow p-8 w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Register for MediSync</h2>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">{success}</div>}
        
        <label className="block mb-2 text-gray-700">Name</label>
        <input
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 text-gray-700">Email</label>
        <input
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 text-gray-700">Password</label>
        <input
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 text-gray-700">Role</label>
        <select
          className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="PATIENT">Patient</option>
          <option value="DOCTOR">Doctor</option>
          {/* Remove ADMIN signup if you don't want public admin self-signup */}
        </select>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}