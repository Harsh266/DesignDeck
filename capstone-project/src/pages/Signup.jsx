import React, { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import jwt_decode from "jwt-decode";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Signup with Email & Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/signup`, formData);
      localStorage.setItem("token", res.data.token);
      alert("Signup successful!");
    } catch (error) {
      console.error("Signup error", error);
    }
  };

  // ✅ Handle Google Signup
  const handleGoogleSuccess = (response) => {
    try {
      const decoded = jwt_decode(response.credential);
      console.log("Google User Data:", decoded);

      // Send user data to your backend for authentication
      fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.credential }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Backend Response:", data);
          // Handle user authentication (e.g., store token, redirect user)
        })
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  };

  const handleGoogleError = (error) => {
    console.error("Google Login Failed:", error);
    alert("Google Login Failed. Please try again.");
  };


  return (
    <GoogleOAuthProvider clientId="96391696642-kfp82uqmp7gh0msk03igtntnletv3u7q.apps.googleusercontent.com"
    >
      <div>
        <div className="flex items-center justify-between min-h-screen bg-white p-6 h-screen">
          {/* Left Section */}
          <div className="w-1/2 h-screen p-6">
            {/* Logo */}
            <h1 className="text-xl font-semibold mb-3">DesignDeck</h1>
            {/* Form */}
            <div className="px-16 py-6 flex flex-col justify-center w-[90%]">
              <h2 className="text-2xl font-semibold">Create Your Account</h2>
              <p className="text-gray-500 mt-1 text-[12px]">
                Let's Create an Account & Showcase Your Creativity with <span className="font-semibold">DesignDeck</span>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mt-5">

                  <input
                    type="text"
                    name="name"
                    placeholder="John Due"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange} required
                  />
                </div>

                <div className="mt-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="xyz@abc.com"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange} required
                  />
                </div>

                <div className="mt-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="XXXXXXXXXXXXXXXXXX"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange} required
                  />
                </div>

                <div className="flex items-center mt-3">
                  <input type="checkbox" className="mr-2" required />
                  <span className="text-[12px] text-gray-600">
                    I agree to all Terms & Conditions of <span className="font-semibold">DesignDeck</span>
                  </span>
                </div>

                <button type="submit" className="w-full bg-[#376CFF] text-white p-3 mt-4 rounded-md hover:bg-blue-700 transition hover:cursor-pointer">
                  Create Account
                </button>
              </form>

              <div className="flex items-center my-2">
                <hr className="w-full border-gray-300" />
                <span className="mx-2 text-gray-500">or</span>
                <hr className="w-full border-gray-300" />
              </div>

              {/* ✅ Google Login Button */}
              <GoogleLogin onSuccess={handleGoogleSuccess}
                onError={handleGoogleError} className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition hover:cursor-pointer ">
                <FcGoogle className="mr-2 text-[20px]" />
                Sign in with Google
              </GoogleLogin>

              <Link to="/signin"><p className="text-sm text-gray-600 mt-4 text-center">
                Already have an account? <span className="text-[#376CFF] cursor-pointer hover:underline">Sign In</span>
              </p></Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-1/2 h-screen flex items-center justify-end p-8">
            <img
              src="./public/Signup.png" // Ensure image is in the 'public' folder
              alt="Sign in"
              className="w-[75%] h-[100%] rounded-lg"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>

  );
}

export default Signup;
