import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Dashboard = () => {
    const categories = ["Explore", "UI/UX", "Poster", "Logo Design", "App Design"];
    const [activeCategory, setActiveCategory] = useState("Explore");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/projects/all-projects");
    
                console.log("API Response:", response.data); // Debugging: Log the response
    
                if (response.data.success && response.data.projects.length > 0) {
                    setProjects(response.data.projects);
                } else {
                    console.warn("No projects found.");
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProjects();
        const interval = setInterval(fetchProjects, 5000);
    
        return () => clearInterval(interval);
    }, []);
    

    return (
        <>
            <Helmet>
                <title>DesignDeck - Dashboard</title>
            </Helmet>
            <Navbar />
            <div className={`px-4 sm:px-6 md:px-8 pt-16 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                {/* Header Section */}
                <div className="relative text-center py-8 sm:py-12 md:py-16 mt-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold px-2">
                        Discover the world's{" "}
                        <span className={`${theme === "dark" ? "text-gray-300" : "text-black"}`}>
                            top designers
                        </span>
                    </h1>
                    <p className={`font-regular mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base px-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Explore work from the most talented and accomplished designers{" "}
                        <span className="hidden sm:inline"><br /></span>
                        ready to take on your next project
                    </p>
                    <div className="mt-4 sm:mt-6 flex items-center justify-center px-4">
                        <div className={`flex items-center px-3 py-2 rounded-full w-full max-w-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-[#DCE6FF] text-gray-700"}`}>
                            <input
                                type="text"
                                placeholder="Find your inspiration"
                                className={`w-full bg-transparent outline-none px-2 text-sm sm:text-base ${theme === "dark" ? "text-white" : "text-gray-700"}`}
                            />
                            <button
                                className={`rounded-full px-2 py-1 sm:px-3 sm:py-2 ${theme === "dark" ? "bg-gray-600" : "bg-[#9091FF]"}`}
                            >
                                <i
                                    className={`ri-search-line ${theme === "dark" ? "text-gray-300" : "text-white"}`}
                                ></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex justify-start md:justify-center mt-4 sm:mt-6 gap-2 sm:gap-4 overflow-x-auto pb-2 px-2">
                    <div className="flex space-x-2 sm:space-x-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap ${activeCategory === cat
                                    ? theme === "dark"
                                        ? "bg-purple-600 text-white"
                                        : "bg-purple-200 text-purple-600"
                                    : theme === "dark"
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Image & Video Grid */}
                {/* <Link to="/"> */}
                    <div className="max-w-full mx-auto p-4 sm:p-6 bg-white text-black">
                        <h3 className="text-xl font-semibold border-b-2 pb-2 w-[30%] sm:w-[20%] md:w-[15%] lg:w-[10%] border-gray-300">
                            All Projects
                        </h3>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                            {loading ? (
                                <p>Loading...</p>
                            ) : projects.length > 0 ? (
                                projects.map((project, index) => (
                                    <div key={index} className="rounded-lg p-3 text-center bg-white">
                                        <img
                                            src={`http://localhost:5000${project.images[0]}`} // Assuming 'images' is an array
                                            alt={project.title}
                                            className="rounded-lg w-full h-40 sm:h-48 md:h-56 lg:h-65 object-cover"
                                        />
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="mt-2 text-base sm:text-lg font-medium truncate">{project.title}</p>
                                            <div className="text-xs sm:text-sm flex justify-center items-center gap-1 mt-1 px-2 py-1 rounded-full bg-[#D5E0FF] text-blue-500">
                                                <i className="ri-heart-fill text-blue-500"></i> 582
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No projects found</p>
                            )}
                        </div>
                    </div>
                {/* </Link> */}

                {/* Load More Button */}
                <div className="flex justify-center mt-6 sm:mt-8 pb-8">
                    <button
                        className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full text-sm sm:text-base font-medium cursor-pointer ${theme === "dark" ? "bg-purple-600 text-white" : "bg-purple-200 text-purple-600"}`}
                    >
                        Load More
                    </button>
                </div>
            </div>
        </>
    );
};

export default Dashboard;