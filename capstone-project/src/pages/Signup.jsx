import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5"; // ✅ Close Icon
import axios from "axios";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Modal State
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/auth/register",
                { name, email, password },
                { withCredentials: true }
            );
            navigate("/signin");
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    const handleGoogleSignup = () => {
        window.open("http://localhost:5000/auth/google", "_self"); 
    };

    return (
        <div className="flex items-center justify-between min-h-screen bg-white p-6 h-screen">
            <div className="w-1/2 h-screen p-6">
                <h1 className="text-xl font-semibold mb-5">DesignDeck</h1>

                <form onSubmit={handleRegister} className="px-16 py-2 flex flex-col justify-center w-[90%]">
                    <h2 className="text-2xl font-semibold">Create an Account</h2>
                    <p className="text-gray-500 mt-1 text-sm">
                        Lets's Create an Account & Showcase Your Creativity
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

                    <div className="mt-3">
                        <input
                            type="password"
                            placeholder="Create a Password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* ✅ Terms & Conditions Checkbox with Popup */}
                    <div className="mt-3 flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mr-2"
                            required
                        />
                        <label htmlFor="terms" className="text-gray-600 text-sm">
                            I agree to the{" "}
                            <span
                                className="text-black cursor-pointer hover:underline"
                                onClick={() => setIsModalOpen(true)} // ✅ Open Modal
                            >
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

                    {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

                    <div className="flex items-center my-2">
                        <hr className="w-full border-gray-300" />
                        <span className="mx-2 text-gray-500">or</span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignup}
                        className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition hover:cursor-pointer"
                    >
                        <FcGoogle className="mr-2 text-[20px]" />
                        Sign up with Google
                    </button>

                    <p className="text-sm text-gray-600 mt-4 text-center">
                        Already have an account?{" "}
                        <span className="text-[#376CFF] cursor-pointer hover:underline" onClick={() => navigate("/signin")}>
                            Sign In
                        </span>
                    </p>
                </form>
            </div>

            {/* Right Section */}
            <div className="w-1/2 h-screen flex items-center justify-end p-8">
                <img src="/Signup.png" alt="Sign up" className="w-[75%] h-[100%] rounded-lg" />
            </div>

            {/* ✅ Terms & Conditions Popup Modal with Close Icon */}
            {isModalOpen && (
                <div className="fixed h-screen w-screen inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[40%] relative">
                    {/* Close Icon in the top-right corner */}
                    <IoClose
                        className="absolute top-4 right-4 text-2xl text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => setIsModalOpen(false)} // ✅ Close Modal
                    />

                    <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
                    <p className="text-sm text-gray-600 text-justify">
                    DesignDeck allows users to showcase their creative work while ensuring a respectful and professional environment. By using our platform, you agree to follow ethical guidelines, avoid posting offensive or copyrighted content, and respect others' intellectual property. Your uploaded content remains yours, but you grant DesignDeck the right to display it publicly. We prioritize user privacy and data security, ensuring that your information is handled responsibly. Any misuse of the platform, including fraud or harassment, may result in account suspension. Continued use of DesignDeck means you accept these terms, which may be updated periodically.
                    </p>
                </div>
            </div>
            

            )}
        </div>
    );
};

export default Signup;
