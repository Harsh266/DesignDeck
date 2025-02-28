import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        { email, password },
        { withCredentials: true }
      );

      alert(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80 p-4 border rounded-lg shadow-md">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Login
        </button>
      </form>

      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Signin;
