import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", { name, email, password }, { withCredentials: true });
      alert(res.data.message);
      navigate("/signin");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-2">
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} className="border p-2" required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2" required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2" required />
        <button type="submit" className="bg-blue-500 text-white p-2">Register</button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-500 underline">Sign in</Link>
      </p>
    </div>
  );
}

export default Signup;
