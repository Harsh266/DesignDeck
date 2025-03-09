import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const mediaItems = [
    {
        type: "video",
        src: "https://cdn.dribbble.com/userupload/13635735/file/original-1c13299dcf94c6aef0e711c92f1b7558.mp4",
        alt: "Video 1",
    },
    {
        type: "image",
        src: "https://cdn.dribbble.com/userupload/13700248/file/original-a89e607ace8bcc3cac6d443bff93a5a2.png?resize=972x729&vertical=center",
        alt: "Image 1",
    },
    {
        type: "image",
        src: "https://cdn.dribbble.com/userupload/13700249/file/original-2cdf1370d41f3ae36cd620bb21ae1085.png?resize=972x729&vertical=center",
        alt: "Image 2",
    },
    {
        type: "image",
        src: "https://cdn.dribbble.com/userupload/13700251/file/original-53bc23f3c654c60779163268d7138859.png?resize=972x729&vertical=center",
        alt: "Image 3",
    },
    {
        type: "image",
        src: "https://cdn.dribbble.com/userupload/13700253/file/original-509498291449a94fa446f0b8dd2f07e7.png?resize=972x729&vertical=center",
        alt: "Image 4",
    },
    {
        type: "image",
        src: "https://cdn.dribbble.com/userupload/13700252/file/original-c319fe647d0d9fba1cced30ad91ef634.png?resize=972x729&vertical=center",
        alt: "Image 5",
    },
];

const Projectview = () => {
    const [expanded, setExpanded] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Helmet>
                <title>DesignDeck - ProfileView Page</title>
            </Helmet>
            <Navbar />
            <div
                className={`container mx-auto p-4 mt-15 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                    }`}
            >

                <div className={`grid gap-4 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                    {mediaItems.map((item, index) => (
                        <div key={index} className="w-full max-w-2xl mx-auto relative">
                            {/* Profile Card only on first media */}
                            {index === 0 && (
                                <div
                                    className={`fixed z-[2] bottom-10 left-1/2 transform -translate-x-1/2 shadow-lg rounded-lg p-4 ${theme === "dark"
                                        ? "bg-black text-white"
                                        : "bg-white text-black"
                                        } ${isCollapsed ? "w-32" : "w-[80%] max-w-md"}`}
                                >
                                    {/* Profile Section */}
                                    <div className="flex items-center justify-center">
                                        {!isCollapsed && (
                                            <div className="flex items-center gap-2 pr-8">
                                                <img
                                                    src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
                                                    alt="Profile"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div>
                                                    <h3 className="text-sm font-semibold">
                                                        Event Management Web App
                                                    </h3>
                                                    <p
                                                        className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                                            }`}
                                                    >
                                                        unknownuser
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex gap-2">
                                            {/* Profile Button */}
                                            <Link to="/otheruser">
                                                <button
                                                    className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${theme === "dark"
                                                        ? "bg-gray-700 hover:bg-gray-600"
                                                        : "bg-gray-200 hover:bg-gray-300"
                                                        }`}
                                                >
                                                    <i
                                                        className={`ri-user-fill text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                                                            }`}
                                                    ></i>
                                                </button>
                                            </Link>

                                            {/* Three-dot Button (Reopen Profile Section) */}
                                            {isCollapsed ? (
                                                <button
                                                    className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${theme === "dark"
                                                        ? "bg-gray-700 hover:bg-gray-600"
                                                        : "bg-gray-200 hover:bg-gray-300"
                                                        }`}
                                                    onClick={() => setIsCollapsed(false)}
                                                >
                                                    <i
                                                        className={`ri-more-2-fill text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                                                            }`}
                                                    ></i>
                                                </button>
                                            ) : (
                                                <>
                                                    {/* Expand/Collapse Button */}
                                                    <button
                                                        className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${theme === "dark"
                                                            ? "bg-gray-700 hover:bg-gray-600"
                                                            : "bg-gray-200 hover:bg-gray-300"
                                                            }`}
                                                        onClick={() => setExpanded(!expanded)}
                                                    >
                                                        <i
                                                            className={`${expanded
                                                                ? "ri-collapse-diagonal-line"
                                                                : "ri-expand-diagonal-fill"
                                                                } text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                                                                }`}
                                                        ></i>
                                                    </button>

                                                    {/* Close Button */}
                                                    <button
                                                        className={`rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${theme === "dark"
                                                            ? "bg-gray-700 hover:bg-gray-600"
                                                            : "bg-gray-200 hover:bg-gray-300"
                                                            }`}
                                                        onClick={() => setIsCollapsed(true)}
                                                    >
                                                        <i
                                                            className={`ri-close-line text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                                                                }`}
                                                        ></i>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Expanded Description Section (Smooth Transition) */}
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "max-h-40 mt-4" : "max-h-0"
                                            }`}
                                    >
                                        <div
                                            className={`p-0 shadow-md rounded-lg ${theme === "dark" ? "bg-black" : "bg-gray-100"
                                                }`}
                                        >
                                            <p
                                                className={`text-sm mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                                                    }`}
                                            >
                                                This innovative Event Management Software is revolutionizing
                                                the planning and execution of events. It features a
                                                user-friendly dashboard, real-time analytics, and seamless
                                                ticketing integration.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Media Display */}
                            {item.type === "image" ? (
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-130 rounded-lg shadow-lg object-cover"
                                />
                            ) : (
                                <video
                                    src={item.src}
                                    autoPlay
                                    loop
                                    muted
                                    className="w-full h-130 rounded-lg shadow-lg object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
};

export default Projectview;
