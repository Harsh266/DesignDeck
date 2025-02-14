import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoMdHeart } from "react-icons/io";
import { RiSaveFill } from "react-icons/ri";
import { BiAperture } from "react-icons/bi";
import { Link } from "react-router-dom";

const ProjectView = () => {
    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-white text-black px-6 md:px-16 pb-6">

            <div className="flex items-center justify-between py-6">
                <h1 className="text-xl font-semibold flex items-center gap-2">
                    <BiAperture /> Project management trend mobile ui design
                </h1>
                <div className="flex gap-4 text-gray-500">
                    <IoMdHeart className="cursor-pointer text-[23px] hover:text-red-500" />
                    <RiSaveFill className="cursor-pointer text-[23px] hover:text-blue-500" />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <img
                    src="https://img.freepik.com/premium-vector/businessman-avatar-profile-picture-silhouette-vector-illustration_1276914-125.jpg"
                    alt="John Doe"
                    className="w-10 h-10 rounded-full"
                />
                <p className="font-medium">John Doe</p>
            </div>

            <div className="mt-6">
                <img
                    src="https://cdn.dribbble.com/userupload/25998282/file/original-a1879ffb5b619b92f427fb6173e60555.png?resize=2046x1535&vertical=center"
                    alt="Project Banner"
                    className="w-full rounded-lg"
                />
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-semibold">
                    Project management trend mobile ui design
                </h2>
                <p className="text-gray-600 mt-2 leading-relaxed">
                    A project management trend mobile UI design requires a UI design and UX design that prioritize task management, team collaboration, and workflow efficiency. A well-structured mobile UI with a minimal UI ensures a clean and intuitive experience, allowing users to easily track tasks, deadlines, and project milestones. The hero section should focus on real-time updates, team progress, and AI-driven analytics, enhancing user engagement through motion design and interactive components.
                </p>
                <p className="text-gray-600 mt-4 leading-relaxed">
                    A well-designed dashboard UI is essential for managing multiple projects, tracking productivity, and integrating AI-powered recommendations for task prioritization. The project timeline, Kanban boards, Gantt charts, and collaboration tools should be optimized for responsive design, ensuring a seamless experience across mobile apps, PWA platforms, and web UI.
                </p>
            </div>

            <div className="mt-20 flex items-center justify-center relative">
                <div className="w-full h-[1px] bg-gray-300"></div>
                <div className="absolute bg-white px-4">
                    <img
                        src="https://img.freepik.com/premium-vector/businessman-avatar-profile-picture-silhouette-vector-illustration_1276914-125.jpg"
                        alt="John Doe"
                        className="w-16 h-16 rounded-full mx-auto border-4 border-white shadow-md"
                    />
                    <p className="text-center mt-2 font-medium">John Doe</p>
                </div>
            </div>
            <div className="mt-16 flex justify-between">
                <h3 className="text-lg font-semibold">Other Projects by John Doe</h3>
                <Link to="/profilepage"><p className="text-black; font-medium cursor-pointer ">
                    View Profile
                </p></Link>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                {["https://cdn.dribbble.com/userupload/22219783/file/original-0e7c7ae13e465147ea31e0a5dbd59088.webp?resize=1200x900&vertical=center",
                    "https://cdn.dribbble.com/userupload/19431465/file/original-e987009a6500aab0c26268b896500d27.jpg?resize=1504x1128&vertical=center",
                    "https://cdn.dribbble.com/userupload/22219787/file/original-a7189ce642eb58345c29e6fd2e18daa2.webp?resize=1200x900&vertical=center",
                    "https://cdn.dribbble.com/userupload/19248873/file/original-4bc3bfacaab9efebacf675dd0faf839f.jpg?resize=1504x1128&vertical=center"]
                    .map((img, index) => (
                        <div key={index} className="rounded-lg overflow-hidden shadow-md">
                            <img src={img} alt="Project Thumbnail" className="w-full" />
                        </div>
                    ))}
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default ProjectView;