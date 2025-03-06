import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const response = await fetch("http://localhost:5000/resetpassword", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
      console.log("Token received from backend:", data.token); // ✅ Debug token
  
      if (response.ok && data.token) {  // ✅ Ensure token exists before redirecting
          setMessage("Redirecting to change password...");
          setTimeout(() => {
              navigate(`/changepasswordwithtoken/${data.token}`);
          }, 2000);
      } else {
          setMessage(data.message || "Something went wrong");
      }
  };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Send Reset Link
                </button>
            </form>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
    );
};

export default ResetPassword;
