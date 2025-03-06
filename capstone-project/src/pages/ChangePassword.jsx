import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { token } = useParams(); // ✅ Extract token from URL
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Print token when component loads
  useEffect(() => {
    console.log("Extracted token from URL:", token);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/changepasswordwithtoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }), // ✅ Send token from URL
    });

    const data = await response.json();
    setMessage(data.message);

    if (response.ok) {
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after success
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default ChangePassword;
