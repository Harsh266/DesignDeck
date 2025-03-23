import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Profilepageothers = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Helmet>
                <title>DesignDeck - Profile Page</title>
            </Helmet>
            <Navbar />
            <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} mt-13`}>
                {/* Profile Section */}
                <div className="w-full flex flex-col items-center">
                    {/* Banner Section */}
                    <div className="w-full max-w-full h-40 sm:h-48 md:h-60">
                        <img
                            src="/public/image.png"
                            alt="Gradient Banner"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Biodata Section */}
                    <div className={`relative w-full ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center -mt-12`}>
                        {/* Profile Image */}
                        <div className="absolute -top-12 left-4 sm:left-6">
                            {/* Blurred Border */}
                            <div className="w-32 h-32 sm:w-44 sm:h-44 absolute -inset-2 rounded-2xl border-4 border-white blur-2xl"></div>

                            {/* Profile Image Container */}
                            <div className={`w-28 h-28 sm:w-40 sm:h-40 ${theme === "dark" ? "bg-black" : "bg-white"} rounded-2xl p-1 relative border-4 border-transparent`}>
                                <img
                                    src="https://www.shutterstock.com/image-photo/portrait-one-young-happy-cheerful-600nw-1980856400.jpg"
                                    alt="User"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="pl-2 sm:pl-48 w-full pt-16 sm:pt-0 flex flex-col gap-3 sm:gap-5">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl sm:text-2xl font-semibold">User name</h2>
                                <p className={`text-sm w-full sm:w-[70%] md:w-[50%] lg:w-[30%] break-words ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    A user biodata is a collection of personal details about an individual. It can be used for job applications.
                                </p>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="mt-4 sm:mt-0 sm:ml-auto flex gap-3 self-end sm:self-auto">
                            <div className={`w-10 h-10 p-2 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-purple-900 text-purple-400" : "bg-purple-100 text-purple-500"}`}>
                                <i className="ri-dribbble-line text-xl"></i>
                            </div>
                            <div className={`w-10 h-10 p-2 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-500"}`}>
                                <i className="ri-behance-line text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* My Projects Section */}
                <div className={`max-w-full mx-auto p-4 sm:p-6 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
                    <h3 className={`text-lg sm:text-xl font-semibold border-b-2 pb-2 w-20 sm:w-24 md:w-28 ${theme === "dark" ? "border-gray-600" : "border-black"}`}>Projects</h3>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                        {[
                            { title: "Fitme app", img: "https://cdn.dribbble.com/userupload/36848296/file/original-8f9bf66f9b3c64857e1c49d26dfc1a5d.jpg?format=webp&resize=450x338&vertical=center" },
                            { title: "NFM Group", img: "https://cdn.dribbble.com/userupload/36937294/file/original-7c320687d1da9efc6cfd636b7a7fe0d5.jpg?format=webp&resize=450x338&vertical=center" },
                            { title: "Block13 Promo Board Design", img: "https://cdn.dribbble.com/userupload/36999634/file/original-8300df08add332e47113859ad01fc95a.jpg?format=webp&resize=1200x900&vertical=center" },
                            { title: "Minimalist Duck Logo", img: "https://cdn.dribbble.com/userupload/36992766/file/original-fcb25abdaa6f3ab9ab7d043aa93c0256.jpg?resize=1200x900&vertical=center" },
                            { title: "Solar Gate-Investing Dashboard", img: "https://cdn.dribbble.com/userupload/36931891/file/original-d7f77534f6e882cc40a418e261314863.jpg?format=webp&resize=450x338&vertical=center" },
                            { title: "Flying Cows Canned Cocktail", img: "https://cdn.dribbble.com/userupload/36982782/file/original-1e6d5b23b751f8d6cd140b2c4705b330.jpg?format=webp&resize=450x338&vertical=center" },
                        ].map((project, index) => (
                            <div key={index} className={`rounded-lg p-2 sm:p-3 text-center ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} `}>
                                <img src={project.img} alt={project.title} className="rounded-lg w-full h-48 sm:h-56 md:h-64 object-cover" />
                                <div className="flex items-center justify-between mt-1">
                                    <p className="mt-2 text-sm sm:text-base md:text-lg font-medium truncate">{project.title}</p>
                                    <div className={`text-xs sm:text-sm flex justify-center items-center gap-1 mt-1 px-2 py-1 rounded-full ${theme === "dark" ? "bg-blue-900 text-blue-300" : "bg-[#D5E0FF] text-blue-500"
                                        }`}>
                                        <i className={`ri-heart-fill ${theme === "dark" ? "text-blue-500" : " text-blue-500"}`}></i> 582
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Get in Touch Section */}
                <div className="w-full flex items-center justify-center p-4 sm:p-6 md:p-10">
                    <div className={`w-full h-40 sm:h-48 md:h-50 rounded-lg sm:rounded-xl md:rounded-[25px] flex items-center justify-center relative shadow-lg ${theme === "dark" ? "bg-gradient-to-r from-gray-700 to-gray-900 shadow-gray-700/30" : "bg-gradient-to-r from-blue-500 to-blue-500 shadow-blue-800/30"
                        }`}>
                        <button onClick={() => setIsPopupOpen(true)} className={`text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-md cursor-pointer ${theme === "dark" ? "bg-gray-700 text-white" : "bg-blue-400 text-white"
                            }`}>
                            Get in Touch
                        </button>
                    </div>
                </div>

                {/* Popup */}
                {isPopupOpen && (
                    <div
                        className={`fixed h-screen w-screen inset-0 ${theme === "dark" ? "bg-black/60" : "bg-black/40"} backdrop-blur-sm flex items-center justify-center z-50`}
                        onClick={() => setIsPopupOpen(false)}
                    >
                        <div
                            className={`rounded-xl p-4 sm:p-6 w-[95%] sm:w-[90%] max-w-md relative flex flex-col justify-center transition-all ${theme === "dark" ? "bg-black text-white shadow-gray-800" : "bg-white text-black shadow-gray-300"}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className={`absolute top-2 sm:top-3 right-3 sm:right-4 text-xl sm:text-2xl cursor-pointer transition-all ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}
                            >
                                &times;
                            </button>

                            {/* Profile Section */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2wA1VwotSa6lpZGtlOPa5Pp7BlsKjigaAovLXKsTyVqQEWnMjPtEYcr1AgBNB3Hvuh00&usqp=CAU"
                                    alt="User"
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                                />
                                <div>
                                    <h3 className="font-semibold">Username</h3>
                                    <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-500"} text-xs sm:text-sm`}>
                                        Responds within a few hours
                                    </p>
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="mt-4 font-medium text-sm sm:text-base">Let's Discuss a Design Opportunity!</h2>
                            <hr className={`border-t-2 w-full sm:w-72 mt-1 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />

                            {/* Form */}
                            <div className="mt-4">
                                <label className="font-medium text-xs sm:text-sm">Project Details</label>
                                <textarea
                                    className={`w-full p-2 border rounded-lg mt-2 text-xs sm:text-sm transition-all ${theme === "dark" ? "border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-400 focus:outline-none" : "border-gray-300 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"}`}
                                    placeholder="Please describe your project"
                                    rows="4"
                                ></textarea>


                                <label className="font-medium text-xs sm:text-sm mt-2 block">Project Timeline</label>
                                <input
                                    className={`w-full p-2 border rounded-lg mt-1 sm:mt-2 text-xs sm:text-sm transition-all ${theme === "dark" ? "border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-400 focus:outline-none" : "border-gray-300 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"}`}
                                    placeholder="Please write your project timeline"
                                />

                                <label className="font-medium text-xs sm:text-sm mt-2 block">Project Budget</label>
                                <input
                                    className={`w-full p-2 border rounded-lg mt-1 sm:mt-2 text-xs sm:text-sm transition-all ${theme === "dark" ? "border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-400 focus:outline-none" : "border-gray-300 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"}`}
                                    placeholder="Enter amount"
                                    type="number"
                                />
                            </div>

                            {/* Send Message Button */}
                            <button
                                className={`text-sm sm:text-md font-medium w-full py-2 sm:py-3 mt-4 rounded-full cursor-pointer transition-all ${theme === "dark" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-[#376CFF] hover:bg-[#2C5CFF] text-white"}`}
                            >
                                <i className="ri-send-plane-line"></i> Send Message
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Profilepageothers;