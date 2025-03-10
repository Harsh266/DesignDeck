import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { IoClose } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext"; // ✅ Import ThemeContext

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(""); // ✅ Success/Error Message
    const [messageType, setMessageType] = useState(""); // ✅ "success" or "error"
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext); // ✅ Access theme

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(""); // Reset message before new request

        try {
            const response = await axios.post(
                "http://localhost:5000/auth/register",
                { name, email, password },
                { withCredentials: true }
            );

            setMessage(response.data.message);
            setMessageType("success");

            // ✅ Redirect after 2 seconds
            setTimeout(() => navigate("/signin"), 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed. Please try again.");
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
                <title>DesignDeck - Signup Page</title>
            </Helmet>
            <div className={`flex items-center justify-between min-h-screen p-6 h-screen transition-colors 
                ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
            >
                <div className="w-1/2 h-screen flex flex-col justify-center p-6">
                    <h1 className="text-xl font-semibold absolute top-7 left-10">DesignDeck</h1>

                    <form onSubmit={handleRegister} className="px-16 py-2 flex flex-col justify-center w-[90%] pt-10">
                        <h2 className="text-2xl font-semibold">Create an Account</h2>
                        <p className={`mt-1 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            Let's Create an Account & Showcase Your Creativity
                        </p>

                        <input
                            type="text"
                            placeholder="Your Name"
                            className={`w-full border rounded-md px-4 py-3 mt-5 focus:outline-none focus:ring-2
                                ${theme === "dark" ? "border-gray-600 bg-black text-white focus:ring-blue-400" : "border-gray-300 bg-white text-black focus:ring-blue-500"}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            placeholder="xyz@abc.com"
                            className={`w-full border rounded-md px-4 py-3 mt-3 focus:outline-none focus:ring-2
                                ${theme === "dark" ? "border-gray-600 bg-black text-white focus:ring-blue-400" : "border-gray-300 bg-white text-black focus:ring-blue-500"}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {/* ✅ Password Input */}
                        <div className="mt-3 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className={`w-full border rounded-md p-3 pr-10 focus:outline-none focus:ring-2
                                    ${theme === "dark" ? "border-gray-600 bg-black text-white focus:ring-blue-400" : "border-gray-300 bg-white text-black focus:ring-blue-500"}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff size={18} className="text-gray-400" /> : <FiEye size={18} className="text-gray-500" />}
                            </button>
                        </div>

                        <div className="mt-3 flex items-center">
                            <input
                                type="checkbox"
                                id="terms"
                                className={`mr-2 accent-blue-500 ${theme === "dark" ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"}`}
                                required
                            />
                            <label
                                htmlFor="terms"
                                className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                            >
                                I agree to the{" "}
                                <span
                                    className={`cursor-pointer hover:underline ${theme === "dark" ? "text-white" : "text-black"}`}
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Terms & Conditions
                                </span>
                            </label>
                        </div>


                        <button
                            type="submit"
                            className={`w-full p-3 mt-4 rounded-md transition hover:cursor-pointer
                                ${theme === "dark" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-[#376CFF] hover:bg-blue-700 text-white"}`}
                        >
                            Sign Up
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

                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            className={`w-full flex items-center justify-center p-3 border rounded-md transition hover:cursor-pointer
                                ${theme === "dark" ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
                        />
                        <p className={`text-sm mt-4 text-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                            Already have an account ?{" "}
                            <span className={`cursor-pointer hover:underline ml-1 ${theme === "dark" ? "text-gray-300" : "text-[#376CFF]"}`} onClick={() => navigate("/signin")}>
                                Sign In
                            </span>
                        </p>
                    </form>
                </div>

                <div className="w-1/2 h-screen flex items-center justify-end p-8">
                    <img src="/Signup.png" alt="Sign up" className="w-[85%] h-full rounded-lg" />
                </div>

                {isModalOpen && (
                    <div className="fixed h-screen w-screen inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                        <div className={`p-6 rounded-lg shadow-lg w-[40%] relative 
                            ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
                        >
                            <IoClose
                                className="absolute top-4 right-4 text-2xl text-gray-600 cursor-pointer"
                                onClick={() => setIsModalOpen(false)}
                            />
                            <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
                            <p className="text-sm text-justify">
                                DesignDeck allows users to showcase their creative work while ensuring a respectful and professional environment. By using our platform, you agree to follow ethical guidelines, avoid posting offensive or copyrighted content, and respect others' intellectual property. Your uploaded content remains yours, but you grant DesignDeck the right to display it publicly. We prioritize user privacy and data security, ensuring that your information is handled responsibly. Any misuse of the platform, including fraud or harassment, may result in account suspension. Continued use of DesignDeck means you accept these terms, which may be updated periodically.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Signup;
