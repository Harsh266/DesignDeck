import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const mediaItems = [
    { type: "video", src: "https://cdn.dribbble.com/userupload/13635735/file/original-1c13299dcf94c6aef0e711c92f1b7558.mp4", alt: "Video 1" },
    { type: "image", src: "https://cdn.dribbble.com/userupload/13700248/file/original-a89e607ace8bcc3cac6d443bff93a5a2.png?resize=972x729&vertical=center", alt: "Image 1" },
    { type: "image", src: "https://cdn.dribbble.com/userupload/13700249/file/original-2cdf1370d41f3ae36cd620bb21ae1085.png?resize=972x729&vertical=center", alt: "Image 2" },
    { type: "image", src: "https://cdn.dribbble.com/userupload/13700251/file/original-53bc23f3c654c60779163268d7138859.png?resize=972x729&vertical=center", alt: "Image 3" },
    { type: "image", src: "https://cdn.dribbble.com/userupload/13700253/file/original-509498291449a94fa446f0b8dd2f07e7.png?resize=972x729&vertical=center", alt: "Image 4" },
    { type: "image", src: "https://cdn.dribbble.com/userupload/13700252/file/original-c319fe647d0d9fba1cced30ad91ef634.png?resize=972x729&vertical=center", alt: "Image 5" },
];

const Projectview = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 mt-12">
                <div className="grid gap-4">
                    {mediaItems.map((item, index) => (
                        <div key={index} className="w-full max-w-2xl mx-auto relative">
                            {/* Profile Card only on first media */}
                            {index === 0 && (
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[80%] max-w-md p-3 bg-white shadow-lg rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img 
                                        src="https://static.vecteezy.com/system/resources/previews/032/176/197/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg" 
                                        alt="Profile" 
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-sm font-semibold">Event management web app</h3>
                                        <p className="text-gray-500 text-xs">unknownuser</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link to="/profilepage"><button className="bg-gray-200 rounded-full w-8 h-8 cursor-pointer">
                                        <i className="ri-user-fill text-gray-600 text-lg"></i>
                                    </button></Link>
                                    <button className="bg-gray-200 rounded-full w-8 h-8 ">
                                        <i className="ri-expand-diagonal-fill text-gray-600 text-lg hover:cursor-pointer"></i>
                                    </button>
                                    <button className="bg-gray-200 rounded-full w-8 h-8 hover:cursor-pointer">
                                        <i className="ri-close-line text-gray-600 text-lg"></i>
                                    </button>
                                </div>
                            </div>
                            )}
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