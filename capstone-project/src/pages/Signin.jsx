import { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

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
    const handleGoogleLogin = () => {
        window.open("http://localhost:5000/auth/google", "_self"); // Redirect to Google login
    };


    return (
        <>
            <Helmet>
                <title>DesignDeck - Sign In</title>
            </Helmet>

            <div
                className={`flex flex-col lg:flex-row items-center justify-center min-h-screen p-6 h-screen overflow-hidden
                ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
            >
                {/* Left Section (Form) */}
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-center p-6">
                    <h1 className="text-xl font-semibold absolute top-7 left-10">DesignDeck</h1>

                    <form onSubmit={handleLogin} className="px-6 md:px-16 py-2 flex flex-col justify-center w-full pt-10">
                        <h2 className="text-2xl font-semibold">Welcome Back</h2>
                        <p className={`mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            Sign in to Showcase, Inspire, and Elevate Your Creativity!
                        </p>

                        {/* Email Input */}
                        <div className="mt-5">
                            <input
                                type="email"
                                placeholder="xyz@abc.com"
                                className={`w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 
                                    ${theme === "dark"
                                        ? "bg-black text-white border-gray-600 focus:ring-blue-400"
                                        : "bg-white text-black border-gray-300 focus:ring-blue-500"}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mt-3 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 pr-10 
                                    ${theme === "dark"
                                        ? "bg-black text-white border-gray-600 focus:ring-blue-400"
                                        : "bg-white text-black border-gray-300 focus:ring-blue-500"}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FiEyeOff size={18} className="text-gray-400" />
                                ) : (
                                    <FiEye size={18} className="text-gray-500" />
                                )}
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <Link
                                to="/resetpassword"
                                className={`text-sm mt-4 cursor-pointer underline
                            ${theme === "dark" ? "text-gray-300" : "text-black"}`}
                            >
                                Forgot Password?
                            </Link>
                        </div>


                        <button
                            type="submit"
                            className={`w-full p-3 mt-4 rounded-md cursor-pointer
                            ${theme === "dark" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-[#376CFF] text-white hover:bg-blue-700"}`}
                        >
                            Sign In
                        </button>

                        {/* Success/Error Message */}
                        {message && (
                            <p className={`mt-3 text-sm ${messageType === "success" ? "text-green-400" : "text-red-500"}`}>
                                {message}
                            </p>
                        )}

                        {/* OR Divider */}
                        <div className="flex items-center my-3">
                            <hr className={`w-full ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />
                            <span className={`mx-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                or
                            </span>
                            <hr className={`w-full ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />
                        </div>

                        {/* Google Login */}
                        <button
                            onClick={handleGoogleLogin}
                            className={`flex items-center justify-center gap-2 px-5 py-2.5 
                        border rounded-md cursor-pointer transition-all 
                        ${theme === "dark" ? "bg-black text-white border-gray-600 hover:bg-gray-800"
                                    : "bg-white text-black border-gray-300 hover:bg-gray-100"}`}
                        >
                            <FcGoogle className="text-xl" />
                            Sign in with Google
                        </button>

                        <p className={`text-sm mt-4 text-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                            Are you new?
                            <Link
                                to="/signup"
                                className={`cursor-pointer hover:underline ml-1
                                ${theme === "dark" ? "text-gray-300" : "text-[#376CFF]"}`}
                            >
                                Create An Account
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Right Section (Hidden on Mobile & Tablet, Visible on Desktop) */}
                <div className="hidden lg:flex w-1/2 h-screen items-center justify-end p-8">
                    <img src="/Signin.png" alt="Sign in" className="w-[85%] h-full rounded-lg" />
                </div>
            </div>
        </>
    );
};

export default SignIn;
