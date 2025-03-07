import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { IoClose } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(""); // ✅ Success/Error Message
    const [messageType, setMessageType] = useState(""); // ✅ "success" or "error"
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

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
            <div className="flex items-center justify-between min-h-screen bg-white p-6 h-screen">
                <div className="w-1/2 h-screen flex flex-col justify-center p-6">
                    <h1 className="text-xl font-semibold absolute top-7 left-10">DesignDeck</h1>

                    <form onSubmit={handleRegister} className="px-16 py-2 flex flex-col justify-center w-[90%] pt-10">
                        <h2 className="text-2xl font-semibold">Create an Account</h2>
                        <p className="text-gray-500 mt-1 text-sm">
                            Let's Create an Account & Showcase Your Creativity
                        </p>

                        <div className="mt-5">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-3">
                            <input
                                type="email"
                                placeholder="xyz@abc.com"
                                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                ref={(input) => (input && showPassword ? input.setSelectionRange(input.value.length, input.value.length) : null)}
                                required
                            />
                            {/* Eye Icon Button */}
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevents focus shift
                                    const input = e.currentTarget.previousSibling; // Get the input element
                                    const cursorPosition = input.selectionStart; // Store cursor position
                                    setShowPassword(!showPassword); // Toggle password visibility
                                    setTimeout(() => input.setSelectionRange(cursorPosition, cursorPosition), 0); // Restore cursor position
                                }}
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>

                        <div className="mt-3 flex items-center">
                            <input type="checkbox" id="terms" className="mr-2" required />
                            <label htmlFor="terms" className="text-gray-600 text-sm">
                                I agree to the{" "}
                                <span className="text-black cursor-pointer hover:underline" onClick={() => setIsModalOpen(true)}>
                                    Terms & Conditions
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#376CFF] text-white p-3 mt-4 rounded-md hover:bg-blue-700 transition hover:cursor-pointer"
                        >
                            Sign Up
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

                        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition hover:cursor-pointer" />


                        <p className="text-sm text-gray-600 mt-4 text-center">
                            Already have an account?{" "}
                            <span className="text-[#376CFF] cursor-pointer hover:underline" onClick={() => navigate("/signin")}>
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
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[40%] relative">
                            <IoClose
                                className="absolute top-4 right-4 text-2xl text-gray-600 cursor-pointer hover:text-black"
                                onClick={() => setIsModalOpen(false)}
                            />
                            <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
                            <p className="text-sm text-gray-600 text-justify">
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
