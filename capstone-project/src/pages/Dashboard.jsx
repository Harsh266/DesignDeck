import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/me", { withCredentials: true });
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data?.message || error.message);
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
