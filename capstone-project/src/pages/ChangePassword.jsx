import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdDoneAll } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Helmet } from "react-helmet";

const ChangePassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("Extracted token from URL:", token);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage(
        <span className="flex items-center gap-2 text-red-500">
          <IoClose className="text-2xl" /> Passwords do not match!
        </span>
      );
      return;
    }

    setMessage(
      <span className="flex items-center gap-2 text-blue-500">
        Processing request...
      </span>
    );

    const response = await fetch("http://localhost:5000/changepasswordwithtoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(
        <span className="flex items-center gap-2 text-[#00B70F]">
          <IoMdDoneAll className="text-2xl" /> Password Reset Succesfully
        </span>
      );
      setTimeout(() => navigate("/signin"), 3000);
    } else {
      setMessage(
        <span className="flex items-center gap-2 text-red-500">
          <IoClose className="text-2xl" /> {data.message || "Something went wrong"}
        </span>
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>DesignDeck - Changepassword Page</title>
      </Helmet>

      <div className="flex items-center justify-between min-h-screen bg-white p-6 h-screen">
        {/* Left Section */}
        <div className="w-1/2 h-full p-10 flex flex-col justify-center items-center bg-white">
          {/* Logo */}
          <h1 className="text-xl font-semibold absolute top-7 left-10">DesignDeck</h1>

          {/* Form Container */}
          <div className="w-full max-w-md px-15">
            {/* Lock Icon */}
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-[12px] bg-white border border-[#D9D9D9]">
                <i className="ri-lock-password-line text-2xl"></i>
              </div>
            </div>

            {/* Title & Description */}
            <h2 className="text-3xl font-semibold text-center">Set New Password</h2>
            <p className="text-gray-500 text-center mt-2 text-sm">
              Must be at least 8 characters
            </p>

            {/* Input Fields */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 p-3 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm Password</label>
                <input
                  type="password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-gray-300 p-3 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={8}
                />
              </div>
              <button
                type="submit"
                className="bg-[#376CFF] text-white p-3 rounded w-full rounded-[5px] cursor-pointer"
              >
                Reset Password
              </button>
            </form>

            {/* Success/Error Message */}
            {message && (
              <p className="mt-4 text-center flex justify-center items-center">
                {message}
              </p>
            )}

            {/* Back to login */}
            <a href="/signin" className="mt-4 text-gray-600 flex items-center justify-center">
              ← Back to login
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 h-screen flex items-center justify-end p-8">
          <img src="/Signin.png" alt="Sign in" className="w-[85%] h-[100%] rounded-lg" />
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
