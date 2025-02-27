import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Profilepage = () => {
    return (
        <>
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
                                    src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
                                    alt="User"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="pl-48">
                            <h2 className="text-2xl font-semibold">User Name</h2>
                            <p className="text-gray-600 text-sm max-w-xs">
                                A user biodata is a collection of personal details about an individual. It can be used for job applications.
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="ml-auto flex gap-3">
                            <div className="bg-purple-100 w-10 h-10 text-purple-500 p-2 rounded-full flex items-center justify-center">
                                <i className="ri-dribbble-line text-xl"></i>
                            </div>
                            <div className="bg-blue-100 w-10 h-10  text-blue-500 p-2 rounded-full flex items-center justify-center">
                                <i className="ri-behance-line text-xl"></i>
                            </div>
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
            </div>
        </>
    );
};

export default Profilepage;
