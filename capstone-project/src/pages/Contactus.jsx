import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../context/ThemeContext"; // Ensure this context is correctly set up

const Contactus = () => {
    const { theme } = useContext(ThemeContext); // Get current theme

    return (
        <>
            <Helmet>
                <title>DesignDeck - Contact Us</title>
            </Helmet>
            <div className={`flex items-center justify-between min-h-screen p-6 h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                {/* Left Side - Logo + Form */}
                <div className="w-1/2 h-screen p-10 flex flex-col justify-center">
                    {/* Logo */}
                    <Link to="/logout">
                        <h1 className="text-xl font-semibold absolute top-7 left-10">DesignDeck</h1>
                    </Link>
                    <div className="px-16 flex flex-col justify-center">
                        {/* Form */}
                        <h2 className="text-3xl font-semibold mb-3">Get in Touch</h2>
                        <p className={`text-sm mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            We will get back to you as soon as possible
                        </p>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className={`w-full rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 
                                    ${theme === "dark" ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
                            />
                            <input
                                type="email"
                                placeholder="Your E-Mail ID"
                                className={`w-full rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 
                                    ${theme === "dark" ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
                            />
                            <textarea
                                placeholder="Message"
                                rows="5"
                                className={`w-full rounded-[20px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 
                                    ${theme === "dark" ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
                            ></textarea>
                            <button className="w-full bg-[#376CFF] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300 cursor-pointer">
                            <i class="ri-send-plane-line"></i> Send Message
                            </button>
                        </form>
                    </div>
                </div>
                {/* Right Side - Image */}
                <div className="w-1/2 h-screen flex items-center justify-end p-8">
                    <img
                        src="/Contactus.png" // Ensure image is in the 'public' folder
                        alt="Contact Us"
                        className="w-[85%] h-full rounded-lg"
                    />
                </div>
            </div>
        </>
    );
};

export default Contactus;
