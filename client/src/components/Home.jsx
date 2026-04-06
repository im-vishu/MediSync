import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {/* Hero section */}
      <div className="w-full flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20 mb-8">
        {/* Left: Heading & Actions */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-700 leading-tight">
            Seamless Healthcare at Your Fingertips
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
            <span className="font-semibold text-blue-900">MediSync</span> connects patients and doctors for hassle-free real-time appointment booking.<br />Secure, fast, and patient-first.
          </p>
          {user ? (
            <Link
              to={`/${user.role.toLowerCase()}/dashboard`}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </Link>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link
                to="/login"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
        {/* Right: SVG Illustration */}
        <div className="flex-1 flex justify-center">
          <svg width="320" height="220" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="160" cy="110" rx="150" ry="90" fill="#dbeafe"/>
            <rect x="70" y="70" width="180" height="80" rx="20" fill="#2563eb"/>
            <rect x="100" y="100" width="120" height="20" rx="5" fill="#fff"/>
            <circle cx="120" cy="110" r="7" fill="#fff"/>
            <rect x="140" y="110" width="70" height="10" rx="5" fill="#38bdf8"/>
            <rect x="100" y="130" width="80" height="12" rx="5" fill="#60a5fa"/>
            <circle cx="220" cy="110" r="12" fill="#3b82f6"/>
            <ellipse cx="160" cy="170" rx="85" ry="15" fill="#bae6fd" opacity=".7"/>
          </svg>
        </div>
      </div>
      {/* Features/Promos */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="bg-white rounded-lg shadow py-6 px-4">
          <h3 className="text-lg font-bold mb-2 text-blue-700">Role-Based Access</h3>
          <p className="text-gray-600">Separate portals for patients, doctors, and administrators—each with tailored tools.</p>
        </div>
        <div className="bg-white rounded-lg shadow py-6 px-4">
          <h3 className="text-lg font-bold mb-2 text-blue-700">Real-Time Slot Booking</h3>
          <p className="text-gray-600">Book and manage appointments instantly, with up-to-date slot availability.</p>
        </div>
        <div className="bg-white rounded-lg shadow py-6 px-4">
          <h3 className="text-lg font-bold mb-2 text-blue-700">Secure & Trusted</h3>
          <p className="text-gray-600">All data transmission uses JWT authentication to protect user privacy and integrity.</p>
        </div>
      </div>
    </div>
  );
}