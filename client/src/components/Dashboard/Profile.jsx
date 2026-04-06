import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {user ? (
        <>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            onClick={logout}
          >
            Logout
          </button>
        </>
      ) : (
        <div>
          <p className="mb-4">You are not logged in.</p>
          <Link
            to="/login"
            className="inline-block mr-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}