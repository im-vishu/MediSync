import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function getInitials(name) {
    return name
      ? name.split(' ').map(x => x[0]).join('').toUpperCase()
      : '?';
  }

  return (
    <div>
      <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Link to="/" className="font-bold text-xl text-white hover:text-blue-300">MediSync</Link>
          <button
            className="lg:hidden ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-2xl">&#9776;</span>
          </button>
          <div className={`absolute left-0 top-14 w-full bg-gray-800 px-6 py-3 z-20 transition-all duration-200 ${menuOpen ? 'block' : 'hidden'} lg:static lg:w-auto lg:ml-4 lg:block`}>
            {user && (
              <>
                {user.role === "ADMIN" && (
                  <Link
                    to="/admin/dashboard"
                    className="block lg:inline lg:mr-4 py-2 lg:py-0 hover:text-blue-300"
                    onClick={()=>setMenuOpen(false)}
                  >Admin Dashboard</Link>
                )}
                {user.role === "DOCTOR" && (
                  <Link
                    to="/doctor/dashboard"
                    className="block lg:inline lg:mr-4 py-2 lg:py-0 hover:text-blue-300"
                    onClick={()=>setMenuOpen(false)}
                  >Doctor Dashboard</Link>
                )}
                {user.role === "PATIENT" && (
                  <Link
                    to="/patient/dashboard"
                    className="block lg:inline lg:mr-4 py-2 lg:py-0 hover:text-blue-300"
                    onClick={()=>setMenuOpen(false)}
                  >Patient Dashboard</Link>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {getInitials(user.name)}
                </div>
                <span>{user.name} [{user.role}]</span>
              </div>
              <Link
                to="/profile"
                className="hover:text-blue-300"
                onClick={()=>setMenuOpen(false)}
              >Profile</Link>
              <button
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition ml-2"
                onClick={logout}
              >Logout</button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
                onClick={()=>setMenuOpen(false)}
              >Login</Link>
              <Link
                to="/register"
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
                onClick={()=>setMenuOpen(false)}
              >Register</Link>
            </>
          )}
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}