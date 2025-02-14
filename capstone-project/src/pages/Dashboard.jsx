import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoMdHeart } from "react-icons/io";
import { RiSaveFill } from "react-icons/ri";
import { GrProjects } from "react-icons/gr";

const projects = [
    {
        id: 1,
        image: "https://cdn.dribbble.com/userupload/18320878/file/original-c2e0bc809ba4caa0c7ffefa9a81f30b6.png?format=webp&resize=640x480&vertical=center",
        profile: "https://www.shutterstock.com/image-vector/businessman-icon-600nw-564112600.jpg",
        name: "Project name",
    },
    {
        id: 2,
        image: "https://cdn.dribbble.com/userupload/18340660/file/original-53e097b6707bf8dc0f4232df7dd20808.png?format=webp&resize=640x480&vertical=center",
        profile: "https://www.shutterstock.com/image-vector/businessman-icon-600nw-564112600.jpg",
        name: "Project name",
    },
    {
        id: 3,
        image: "https://cdn.dribbble.com/userupload/26161848/file/original-c3e2491e8c5155829ff44a41d814ecf7.png?format=webp&resize=640x480&vertical=center",
        profile: "https://www.shutterstock.com/image-vector/businessman-icon-600nw-564112600.jpg",
        name: "Project name",
    },
    {
        id: 4,
        image: "https://cdn.dribbble.com/userupload/26242668/file/original-185a5cab278f2078a11c30dbae1c319a.jpg?format=webp&resize=640x480&vertical=center",
        profile: "https://www.shutterstock.com/image-vector/businessman-icon-600nw-564112600.jpg",
        name: "Project name",
    },
    {
        id: 5,
        image: "https://cdn.dribbble.com/userupload/26039594/file/original-f134bb0db38577e9d8a79d632a28026b.png?format=webp&resize=640x480&vertical=center",
        profile: "https://www.shutterstock.com/image-vector/businessman-icon-600nw-564112600.jpg",
        name: "Project name",
    },
    {
        id: 6,
        image: "https://cdn.dribbble.com/userupload/26243163/file/original-b3922b51eacc31d20160536aea278cd7.png?format=webp&resize=640x480&vertical=center",
        profile: "https://www.shutterstock.com/image-vector/businessman-icon-600nw-564112600.jpg",
        name: "Project name",
    },
    {
        id: 7,
        image: "https://cdn.dribbble.com/userupload/17999471/file/original-6d0d79c8f477824bbd121e8bb8b00a8d.png?format=webp&resize=640x480&vertical=center",
        profile: "https://www.shutterstock.com/image-vector/businessman-icon-600nw-564112600.jpg",
        name: "Project name",
    },
    {
        id: 8,
        image: "https://cdn.dribbble.com/userupload/26080916/file/original-48dabccb29b43e4397dcccebdc525f9b.jpg?format=webp&resize=640x480&vertical=center",
        profile: "https://www.shutterstock.com/image-vector/businessman-icon-600nw-564112600.jpg",
        name: "Project name",
    },
    {
        id: 9,
        image: "https://cdn.dribbble.com/userupload/22771706/file/original-39e8894cba34142c0ff2eeac97be0888.png?format=webp&resize=640x480&vertical=center",
        profile: "https://www.shutterstock.com/image-vector/businessman-icon-600nw-564112600.jpg",
        name: "Project name",
    },
];

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <div className="p-6">
                <div className="flex flex-row gap-2 items-center mb-4">
                <GrProjects className="text-[18px]"/><p className="text-2xl font-semibold"> Projects</p>
                </div>
            

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Link to="/view"><div
                            key={project.id}
                            className="bg-white shadow-md rounded-lg p-4 relative"
                        >
                            <img
                                src={project.image}
                                alt={project.name}
                                className="w-full rounded-lg"
                            />
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={project.profile}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="font-semibold">{project.name}</span>
                                </div>
                                <div className="flex space-x-3 text-gray-500">
                                    <IoMdHeart className="cursor-pointer text-[20px] hover:text-red-500" />
                                    <RiSaveFill className="cursor-pointer text-[20px] hover:text-blue-500" />
                                </div>
                            </div>
                        </div></Link>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;