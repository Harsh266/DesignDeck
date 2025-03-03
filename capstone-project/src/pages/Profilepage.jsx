import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { Helmet } from "react-helmet";

const Profilepage = () => {

    const [user, setUser] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:5000/auth/me", {
                    withCredentials: true,
                });

                if (res.data && res.data._id) {
                    setUser(res.data);
                } else {
                    navigate("/signin"); // Redirect to login if no user found
                }
            } catch (error) {
                console.error("❌ Error fetching user:", error.response?.data?.message || error.message);
                navigate("/signin"); // Redirect if not authenticated
            }
        };

        fetchUser();
    }, [navigate]);

    if (!user) {
        return <h1 className="text-center mt-10 text-lg">Loading...</h1>;
    }

    return (
        <>
            <Helmet>
                <title>DesignDeck - Profile Page {user.name}</title>
            </Helmet>
            <Navbar />
            <div className="min-h-screen bg-gray-100 mt-16">
                {/* Profile Section */}
                <div className="w-full flex flex-col items-center">
                    {/* Banner Section */}
                    <div className="w-[100%] max-w-full h-60">
                        <img
                            src="/public/image.png"
                            alt="Gradient Banner"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Biodata Section */}
                    <div className="relative w-[100%] max-full bg-white p-6 flex items-center -mt-12">
                        {/* Profile Image */}
                        <div className="absolute -top-12 left-6">
                            {/* Blurred Border */}
                            <div className="w-44 h-44 absolute -inset-2 rounded-2xl border-4 border-white blur-2xl"></div>

                            {/* Profile Image Container */}
                            <div className="w-40 h-40 bg-white rounded-2xl p-1 relative border-4 border-transparent">
                                <img
                                    img src={user.image || "https://static.thenounproject.com/png/642902-200.png"}
                                    alt="User"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="pl-48">
                            <h2 className="text-2xl font-semibold">{user.name}</h2>
                            <p className="text-gray-600 text-sm max-w-xs">
                                {user.bio || "No Bio     "}
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="ml-auto flex gap-3">
                            <button
                                onClick={() => setIsPopupOpen(true)}
                                className="bg-[#C3D7FF] text-[#0057FF] px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-[#A9C4FF] transition cursor-pointer"
                            >
                                <FaUserEdit className="text-lg" /> Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* My Projects Section */}
                <div className="max-w-full mx-auto p-6 bg-white">
                    <h3 className="text-xl font-semibold border-b-2 pb-2 w-[10%] ">My Projects</h3>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        {/* Sample Project Cards */}
                        {[
                            { title: "Fitme app", img: "https://cdn.dribbble.com/userupload/36848296/file/original-8f9bf66f9b3c64857e1c49d26dfc1a5d.jpg?format=webp&resize=450x338&vertical=center" },
                            { title: "NFM Group", img: "https://cdn.dribbble.com/userupload/36937294/file/original-7c320687d1da9efc6cfd636b7a7fe0d5.jpg?format=webp&resize=450x338&vertical=center" },
                            { title: "Block13 Promo Board Design", img: "https://cdn.dribbble.com/userupload/36999634/file/original-8300df08add332e47113859ad01fc95a.jpg?format=webp&resize=1200x900&vertical=center" },
                            { title: "Minimalist Duck Logo", img: "https://cdn.dribbble.com/userupload/36992766/file/original-fcb25abdaa6f3ab9ab7d043aa93c0256.jpg?resize=1200x900&vertical=center" },
                            { title: "Solar Gate-Investing Dashboard", img: "https://cdn.dribbble.com/userupload/36931891/file/original-d7f77534f6e882cc40a418e261314863.jpg?format=webp&resize=450x338&vertical=center" },
                        ].map((project, index) => (
                            <div key={index} className="bg-white rounded-lg p-3 text-center">
                                <img src={project.img} alt={project.title} className="rounded-lg w-full h-65" />
                                <div className="flex items-center justify-between mt-1">
                                    <p className="mt-2 text-lg font-medium">{project.title}</p>
                                    <div className="text-blue-500 text-sm flex justify-center items-center gap-1 mt-1 bg-[#D5E0FF] px-2 py-1 rounded-full">
                                        <i className="ri-heart-fill bg-[#D5E0FF]"></i> 582
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Upload Project Card */}
                        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center w-full h-70 relative">
                            <div className="bg-[#DCE6FF] text-[#376CFF] rounded-full w-15 h-15 flex items-center justify-center">
                                <Link to="/upload"><i className="ri-function-add-fill text-3xl"></i></Link>
                            </div>
                            <p className="mt-3 text-2xl font-medium text-black">Upload Project</p>
                            <p className="text-black text-sm text-center w-[70%]">
                                Show your creativity by uploading it to world.
                            </p>
                        </div>

                    </div>
                </div>
                {isPopupOpen && (
                    <div
                        className="fixed h-screen w-screen inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={() => setIsPopupOpen(false)}
                    >
                        <div
                            className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative flex flex-col justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl cursor-pointer"
                            >
                                &times;
                            </button>

                            {/* Profile Section */}
                            <div className="flex items-center gap-3">
                                <img
                                    img src={user.image || "https://static.thenounproject.com/png/642902-200.png"}
                                    alt="User"
                                    className="w-15 h-15 rounded-full"
                                />
                                <div>
                                    <h3 className="font-semibold">{user.name}</h3>
                                    <p className="text-gray-500 text-sm">{user.email}</p>
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="mt-4 font-medium">Update Your Profile</h2>
                            <hr className="border-t-2 w-39 mt-1" />

                            {/* Form */}
                            <div className="mt-4">
                                {/* Profile Image Upload */}
                                <label className="font-medium text-sm block">Profile Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full p-2 border border-[#B7B7B7] rounded-lg mt-2 text-sm"
                                />

                                {/* Bio */}
                                <label className="font-medium text-sm mt-2 block">Bio</label>
                                <textarea
                                    className="w-full p-2 border border-[#B7B7B7] rounded-lg mt-2 text-sm"
                                    placeholder="Tell something about yourself"
                                    rows="2"
                                ></textarea>

                                {/* Instagram Link */}
                                <label className="font-medium text-sm mt-1 block">Instagram Profile</label>
                                <input
                                    type="url"
                                    className="w-full p-2 border border-[#B7B7B7] rounded-lg mt-2 text-sm"
                                    placeholder="Enter your Instagram link"
                                />

                                {/* Behance Link */}
                                <label className="font-medium text-sm mt-2 block">Behance Profile</label>
                                <input
                                    type="url"
                                    className="w-full p-2 border border-[#B7B7B7] rounded-lg mt-2 text-sm"
                                    placeholder="Enter your Behance link"
                                />
                            </div>

                            {/* Save Changes Button */}
                            <button className="bg-[#376CFF] text-white text-md font-medium w-full py-3 mt-4 rounded-full cursor-pointer">
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Profilepage;
