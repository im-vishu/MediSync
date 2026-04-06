import { NOTIMP } from "node:dns";
import { useAuth } from "../../context/AuthContext";
export default function Profile() {
  const { user, logout } = useAuth();
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {user ? (
        <>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded" onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Not logged in.</p>
      )}
    </div>
  );
}