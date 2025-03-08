import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    // ✅ Handle Email/Password Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await axios.post(
                "http://localhost:5000/auth/login",
                { email, password },
                { withCredentials: true }
            );

            setMessage(res.data.message);
            setMessageType("success");

            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed. Please try again.");
            setMessageType("error");
        }
    };

    // ✅ Handle Google Login
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log("User Info:", decoded);

            const res = await axios.post(
                "http://localhost:5000/auth/google",
                {
                    name: decoded.name,
                    email: decoded.email,
                    profilePicture: decoded.picture,
                    googleId: decoded.sub,
                },
                { withCredentials: true }
            );

            console.log("Backend Response:", res.data);
            navigate("/dashboard");
        } catch (error) {
            console.error("Google Login Error:", error.response?.data || error.message);
        }
    };

    const handleGoogleError = () => {
        console.error("Google Login Failed");
    };

    return (
        <>
            <Helmet>
                <title>DesignDeck - Signin Page</title>
            </Helmet>
            <div
                className={`flex items-center justify-between min-h-screen h-screen p-6 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                    }`}
            >
                {/* Left Section */}
                <div className="w-1/2 h-screen p-6 flex flex-col justify-center">
                    <h1 className="text-xl font-semibold absolute top-7 left-10">
                        DesignDeck
                    </h1>
                    <form
                        onSubmit={handleLogin}
                        className="px-16 flex flex-col justify-center w-[90%] pt-10"
                    >
                        <h2 className="text-2xl font-semibold">Welcome Back</h2>
                        <p
                            className={`mt-1 transition-all ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                }`}
                        >
                            Sign in to Showcase, Inspire, and Elevate Your Creativity!
                        </p>

                        {/* ✅ Email Input */}
                        <div className="mt-5">
                            <input
                                type="email"
                                placeholder="xyz@abc.com"
                                className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 transition-all ${theme === "dark"
                                    ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-400"
                                    : "bg-white text-black border-gray-300 focus:ring-blue-500"
                                    }`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* ✅ Password Input with Eye Icon */}
                        <div className="mt-3 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 pr-10 transition-all ${theme === "dark"
                                    ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-400"
                                    : "bg-white text-black border-gray-300 focus:ring-blue-500"
                                    }`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {/* Eye Icon Button */}
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>

                        <Link to="/resetpassword">
                            <div
                                className={`text-right text-sm mt-4 cursor-pointer underline transition-all ${theme === "dark" ? "text-gray-300" : "text-black"
                                    }`}
                            >
                                Forgot Password?
                            </div>
                        </Link>

                        <button
                            type="submit"
                            className={`w-full p-3 mt-4 rounded-md transition-all hover:cursor-pointer ${theme === "dark"
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-[#376CFF] text-white hover:bg-blue-700"
                                }`}
                        >
                            Sign In
                        </button>

                        {/* ✅ Show Message */}
                        {message && (
                            <p
                                className={`mt-3 text-sm transition-all ${messageType === "success"
                                    ? "text-green-400"
                                    : "text-red-500"
                                    }`}
                            >
                                {message}
                            </p>
                        )}

                        <div className="flex items-center my-2">
                            <hr className={`w-full transition-all ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />
                            <span className={`mx-2 transition-all ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                or
                            </span>
                            <hr className={`w-full transition-all ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />
                        </div>

                        {/* ✅ Google Sign In */}
                        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />

                        <p className={`text-sm mt-4 text-center transition-all ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                            Are you new?{" "}
                            <Link to="/signup" className="text-[#376CFF] cursor-pointer hover:underline">
                                Create An Account
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Right Section */}
                <div className="w-1/2 h-screen flex items-center justify-end p-8">
                    <img
                        src="/Signin.png"
                        alt="Sign in"
                        className="w-[85%] h-[100%] rounded-lg transition-all"
                    />
                </div>
            </div>

        </>
    );
};

export default SignIn;
