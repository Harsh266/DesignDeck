import React, { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const API_URL = "http://localhost:5137/auth";

function Signup() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle Signup with Email & Password
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/auth/signup", {
                name,
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
            navigate("/dashboard");

        } catch (error) {
            console.error("Signup error:", error);
            alert(error.response?.data?.message || "Signup failed!");
        }
    };

    // ✅ Handle Google Signup
    const handleGoogleSuccess = async (response) => {
        try {
            const { credential } = response; // Google JWT Token

            const res = await axios.post("http://localhost:5137/auth/google", {
                tokenId: credential,
            });

            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
            navigate("/dashboard");

        } catch (error) {
            console.error("Google login error:", error);
            alert("Google Sign-In failed. Try again!");
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
                        <h1 className="text-xl font-semibold mb-10">DesignDeck</h1>
                        {/* Form */}
                        <div className="px-16 py-6 flex flex-col justify-center w-[90%]">
                            <h2 className="text-2xl font-bold">Welcome Back</h2>
                            <p className="text-gray-500 mt-1">
                                Sign in to Showcase, Inspire, and Elevate Your Creativity!
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="mt-5">
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
                                <div className="text-right text-black text-sm mt-2 cursor-pointer underline">
                                    Forgot Password?
                                </div>

                                <button type="submit" className="w-full bg-[#376CFF] text-white p-3 mt-4 rounded-md hover:bg-blue-700 transition hover:cursor-pointer">
                                    Sign In
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

                            <Link to="/signup"><p className="text-sm text-gray-600 mt-4 text-center">
                                Are you new? <span className="text-[#376CFF] cursor-pointer hover:underline">Create Account</span>
                            </p></Link>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-1/2 h-screen flex items-center justify-end p-8">
                        <img
                            src="./public/Signin.png" // Ensure image is in the 'public' folder
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
