import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // ✅ Success/Error Message
    const [messageType, setMessageType] = useState(""); // ✅ "success" or "error"
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(""); // Reset message before new request

        try {
            const res = await axios.post(
                "http://localhost:5000/auth/login",
                { email, password },
                { withCredentials: true }
            );

            setMessage(res.data.message);
            setMessageType("success");

            // ✅ Redirect after 2 seconds
            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed. Please try again.");
            setMessageType("error");
        }
    };

    const handleGoogleLogin = () => {
        window.open("http://localhost:5000/auth/google", "_self"); // Update with your backend Google OAuth URL
    };

    return (
        <div className="flex items-center justify-between min-h-screen bg-white p-6 h-screen">
            <div className="w-1/2 h-screen p-6 flex flex-col justify-center">
                <h1 className="text-xl font-semibold mb-10">DesignDeck</h1>
                <form onSubmit={handleLogin} className="px-16 py-6 flex flex-col justify-center w-[90%]">
                    <h2 className="text-2xl font-semibold">Welcome Back</h2>
                    <p className="text-gray-500 mt-1">
                        Sign in to Showcase, Inspire, and Elevate Your Creativity!
                    </p>

                    <div className="mt-5">
                        <input
                            type="email"
                            placeholder="xyz@abc.com"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-3">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="text-right text-black text-sm mt-2 cursor-pointer underline">
                        Forgot Password?
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#376CFF] text-white p-3 mt-4 rounded-md hover:bg-blue-700 transition hover:cursor-pointer"
                    >
                        Sign In
                    </button>

                    {/* ✅ Show Message Below the Button */}
                    {message && (
                        <p className={`mt-3 text-sm ${messageType === "success" ? "text-green-600" : "text-red-500"}`}>
                            {message}
                        </p>
                    )}

                    <div className="flex items-center my-2">
                        <hr className="w-full border-gray-300" />
                        <span className="mx-2 text-gray-500">or</span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    {/* Google Sign In */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition hover:cursor-pointer"
                    >
                        <FcGoogle className="mr-2 text-[20px]" />
                        Sign in with Google
                    </button>

                    <p className="text-sm text-gray-600 mt-4 text-center">
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
                    src="/Signin.png" // Ensure the image is placed inside the 'public' folder
                    alt="Sign in"
                    className="w-[85%] h-[100%] rounded-lg"
                />
            </div>
        </div>
    );
};

export default Signin;
