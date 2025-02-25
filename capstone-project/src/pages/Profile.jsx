import { Link } from "react-router-dom";
import React from "react";
import { GrProjects } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { MdEdit } from "react-icons/md";
import Navbar from "../components/Navbar";

const projects = [
    {
        name: "Health Tracking Dashboard",
        image: "https://cdn.dribbble.com/userupload/16718642/file/original-e2cce1662b906965c7fd2cc98a8a1a7c.png?resize=2046x1535&vertical=center",
    },
    {
        name: "E-Commerce UI",
        image: "https://cdn.dribbble.com/userupload/14356022/file/original-c8d69d9f5d998a4245f93178320d4afc.png?resize=1200x899&vertical=center",
    },
    {
        name: "Portfolio Website",
        image: "https://cdn.dribbble.com/userupload/13385312/file/original-a259ab9888864a1fe9cc5ebe577ac6e9.png?resize=2046x1535&vertical=center",
    },
    {
        name: "AI Chatbot",
        image: "https://cdn.dribbble.com/userupload/6208456/file/original-752a04c2dd5c59a27ee8415c9048b603.png?resize=2048x1536&vertical=center",
    },
    {
        name: "Fitness App",
        image: "https://cdn.dribbble.com/userupload/11892177/file/original-6c10dfcb127239b5faff15f5ec57b3a8.png?resize=2048x1536&vertical=center",
    },
    {
        name: "Travel Booking",
        image: "https://cdn.dribbble.com/userupload/13948938/file/original-3f5926c6fe49a6a47fe50efab26333ea.png?resize=2046x1535&vertical=center",
    },
];

const Profile = () => {
    return (
        <div className="min-h-screen bg-white text-black ">
            <Navbar />
            <div className="relative">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQI_v3klpaImcTlaBpbU4WBra-YX9c69QEoQ&s"
                    alt="Background"
                    className="w-full h-52 object-cover"
                />
            </div>
            <div className="flex pb-8">
                <div className="w-full md:w-1/4 bg-[#F0F4FF] p-6 rounded-lg text-center flex flex-col items-center ">
                    <img
                        src="https://img.freepik.com/premium-vector/businessman-avatar-profile-picture-silhouette-vector-illustration_1276914-125.jpg"
                        alt="User"
                        className="w-28 h-28 mx-auto rounded-full border-4 border-gray-300"
                    />
                    <h2 className="text-2xl font-bold mt-4">John Doe</h2>
                    <p className="text-blue-500">DS - AI Student</p>
                    <div className="mt-3 space-y-2 text-gray-600">
                        <p className="flex items-center justify-center space-x-2">
                        <FaLocationDot /> <span>Ahmedabad, India</span>
                        </p>
                        <p className="flex items-center justify-center space-x-2">
                        <TbWorld /> <span>johndoe.me</span>
                        </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        I am a passionate designer and developer dedicated to creating visually stunning and highly functional web experiences.
                    </p>
                    <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex flex-row items-center gap-2 hover:cursor-pointer">
                    <MdEdit />Edit Profile
                    </button>
                </div>

                <div className="w-full md:w-3/4 md:mt-0 md:ml-8 float-right pt-8 pr-8">
                    <div className="flex flex-row gap-2 items-center mb-4">
                                    <GrProjects className="text-[18px]"/><p className="text-2xl font-semibold"> Projects</p>
                                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-50 object-cover"
                                />
                                <div className="text-left text-black font-semibold px-2 py-2">
                                    {project.name}
                                </div>
                            </div>
                        ))}

                        <div className="bg-[#F0F4FF] p-6 text-center rounded-lg flex flex-col items-center justify-center">
                            <Link to="/upload"><div className="bg-blue-500 p-4 rounded-full text-white w-12 h-12 flex items-center hover:bg-blue-600 cursor-pointer">
                                <span className="text-2xl font-bold">+</span>
                            </div></Link>
                            <h3 className="mt-6 font-semibold text-lg">Create Project</h3>
                            <p className="text-gray-500 text-[10px]">
                                Get feedback, views, and appreciations. Public projects can be featured by our curators.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
