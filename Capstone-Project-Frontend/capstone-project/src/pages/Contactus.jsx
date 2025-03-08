import React from "react";
import { Link } from "react-router-dom";

const Contactus = () => {
    return (
        <>
            <div className="flex items-center justify-between min-h-screen bg-gray-100 p-6 h-screen ">
                {/* Left Side - Logo + Form */}
                <div className="w-1/2 h-screen p-10 flex flex-col justify-center">
                    {/* Logo */}
                    <Link to="/logout"><h1 className="text-xl font-semibold mb-10">DesignDeck</h1></Link>
                    <div className="px-16 py-6 flex flex-col justify-center">
                        {/* Form */}
                        <h2 className="text-3xl font-semibold mb-3">Get in Touch</h2>
                        <p className="text-gray-500 text-sm mb-6">
                            We will get back to you as soon as possible
                        </p>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Your E-Mail ID"
                                className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                placeholder="Message"
                                rows="5"
                                className="w-full border border-gray-300 rounded-[20px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            <button className="w-full bg-[#376CFF] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
                {/* Right Side - Image */}
                <div className="w-1/2 h-screen flex items-center justify-end p-8">
                    <img
                        src="./public/Contactus.png" // Ensure image is in the 'public' folder
                        alt="Contact Us"
                        className="w-[80%] h-[100%] rounded-lg"
                    />
                </div>
            </div>
        </>
    );
};

export default Contactus;
