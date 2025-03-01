import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/auth/register",
                { name, email, password },
                { withCredentials: true }
            );
            alert(res.data.message);
            navigate("/signin"); // Redirect to Sign-In after successful registration
        } catch (error) {
            console.error("Registration Error:", error.response?.data?.message || error.message);
            alert(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    const handleGoogleSignup = () => {
        window.open("http://localhost:5000/auth/google", "_self"); // Update with backend Google OAuth URL
    };

    return (
        <div className="flex items-center justify-between min-h-screen bg-white p-6 h-screen">
            {/* Left Section */}
            <div className="w-1/2 h-screen p-6">
                {/* Logo */}
                <h1 className="text-xl font-semibold mb-10">DesignDeck</h1>

                {/* Form */}
                <form onSubmit={handleRegister} className="px-16 py-2 flex flex-col justify-center w-[90%]">
                    <h2 className="text-2xl font-bold">Create an Account</h2>
                    <p className="text-gray-500 mt-1">
                        Join DesignDeck and showcase your creativity to the world!
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
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#376CFF] text-white p-3 mt-4 rounded-md hover:bg-blue-700 transition hover:cursor-pointer"
                    >
                        Sign Up
                    </button>

                    <div className="flex items-center my-4">
                        <hr className="w-full border-gray-300" />
                        <span className="mx-2 text-gray-500">or</span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    {/* Google Sign Up */}
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
                        <Link to="/signin" className="text-[#376CFF] cursor-pointer hover:underline">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>

            {/* Right Section */}
            <div className="w-1/2 h-screen flex items-center justify-end p-8">
                <img
                    src="/Signup.png" // Ensure the image is placed inside the 'public' folder
                    alt="Sign up"
                    className="w-[75%] h-[100%] rounded-lg"
                />
            </div>
        </div>
    );
};

export default Signup;
