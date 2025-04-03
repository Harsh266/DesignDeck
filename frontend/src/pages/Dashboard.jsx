import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import api from "../services/api"; // Adjust the import based on your project structure
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Dashboard = () => {
    const categories = ["All", "UI/UX", "Motion Graphics", "Web Design", "App Design", "Graphic Design", "Fashion Design", "Other"];
    const [activeCategory, setActiveCategory] = useState("All");
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const { theme } = useContext(ThemeContext);

    // Fetch projects when category changes
    useEffect(() => {
        const fetchProjectsByCategory = async () => {
            setLoading(true);
            try {
                const apiUrl = "api/projects/all-projects";

                // Important change: For "All" category, explicitly pass null or undefined to ensure backend doesn't use previous value
                const params = activeCategory === "All"
                    ? { category: null }
                    : { category: activeCategory };

                const response = await api.get(apiUrl, {
                    params: params,
                    withCredentials: true,
                });

                // Process response
                if (response.data.success) {
                    setProjects(response.data.projects || []);
                    setFilteredProjects(response.data.projects || []);
                } else {
                    setProjects([]);
                    setFilteredProjects([]);
                }
            } catch (error) {
                console.error(`Error fetching projects:`, error);
                setProjects([]);
                setFilteredProjects([]);
            } finally {
                setLoading(false);
            }
        };
        setSearchQuery(""); // Reset search query when changing categories

        fetchProjectsByCategory();

        // Set interval for every 5 seconds
        const interval = setInterval(fetchProjectsByCategory, 5000);

        // Cleanup function to clear interval on unmount or category change
        return () => clearInterval(interval);
    }, [activeCategory]);

    // Apply search filter whenever searchQuery changes
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredProjects(projects);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = projects.filter(project =>
            project.title.toLowerCase().includes(query) ||
            project.description?.toLowerCase().includes(query) ||
            project.userId?.name?.toLowerCase().includes(query)
        );

        setFilteredProjects(filtered);
    }, [searchQuery, projects]);

    // Handle category change
    const handleCategoryChange = (category) => {
        if (category === activeCategory) return; // Skip if same category

        setLoading(true); // Show loading immediately
        setActiveCategory(category);
        // The useEffect will handle fetching new data
    };

    // Reset search
    const resetSearch = () => {
        setSearchQuery("");
    };

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
                        <form className="w-full max-w-md relative">
                            <div className={`flex items-center px-3 py-2 rounded-full w-full ${theme === "dark" ? "bg-gray-800 text-white" : "bg-[#DCE6FF] text-gray-700"}`}>
                                <input
                                    type="text"
                                    placeholder="Find your inspiration"
                                    className={`w-full bg-transparent outline-none px-2 text-sm sm:text-base ${theme === "dark" ? "text-white" : "text-gray-700"}`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={resetSearch}
                                        className="mr-1 text-gray-400 hover:text-gray-600"
                                    >
                                        <i className="ri-close-line"></i>
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className={`rounded-full px-2 py-1 sm:px-3 sm:py-2 ${theme === "dark" ? "bg-gray-600" : "bg-[#9091FF]"}`}
                                >
                                    <i
                                        className={`ri-search-line ${theme === "dark" ? "text-gray-300" : "text-white"}`}
                                    ></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex justify-start md:justify-center mt-4 sm:mt-6 gap-2 sm:gap-4 overflow-x-auto pb-2 px-2">
                    <div className="flex space-x-2 sm:space-x-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
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
                <div className={`max-w-full mx-auto p-4 sm:p-6 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                    <h3
                        className={`text-xl font-semibold border-b-2 pb-2 inline-block min-w-fit px-1 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}
                    >
                        {activeCategory === "All" ? "All Projects" : `${activeCategory} Projects`}
                    </h3>

                    {filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                            {filteredProjects.map((project, index) => (
                                <Link to={`/view/${project._id}`} key={project._id || index} className="no-underline">
                                    <div className={`rounded-xl overflow-hidden group cursor-pointer ${theme === "dark" ? "bg-black" : "bg-white"}`}>
                                        {/* Media Handling */}
                                        <div className="relative w-full h-48 sm:h-52 md:h-60 rounded-xl overflow-hidden">
                                            {project.images && project.images.length > 0 ? (
                                                <>
                                                    {/* Show Image by Default */}
                                                    <img
                                                        src={`http://localhost:5000${project.images[0]}` || "/default-thumbnail.jpg"}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover rounded-xl group-hover:hidden"
                                                    />
                                                    {/* Show Video on Hover if available, otherwise show same image */}
                                                    {project.videos && project.videos.length > 0 ? (
                                                        <video
                                                            className="w-full h-full object-cover rounded-xl hidden group-hover:block"
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                        >
                                                            <source src={`http://localhost:5000${project.videos[0]}`} />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    ) : (
                                                        <img
                                                            src={`http://localhost:5000${project.images[0]}` || "/default-thumbnail.jpg"}
                                                            alt={project.title}
                                                            className="w-full h-full object-cover rounded-xl hidden group-hover:block"
                                                        />
                                                    )}
                                                </>
                                            ) : project.videos && project.videos.length > 0 ? (
                                                <>
                                                    {/* For video-only projects: Show first frame of video as static thumbnail */}
                                                    <div className="w-full h-full group-hover:hidden">
                                                        <video
                                                            className="w-full h-full object-cover rounded-xl"
                                                            muted
                                                            playsInline
                                                            preload="metadata"
                                                        >
                                                            <source src={`http://localhost:5000${project.videos[0]}`} />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                    {/* Play video on hover */}
                                                    <video
                                                        className="w-full h-full object-cover rounded-xl hidden group-hover:block"
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                    >
                                                        <source src={`http://localhost:5000${project.videos[0]}`} />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                </>
                                            ) : (
                                                <img
                                                    src="/default-thumbnail.jpg"
                                                    alt={project.title}
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                            )}

                                            {/* Category Label */}
                                            <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs bg-opacity-70 bg-black text-white">
                                                {project.category || "Uncategorized"}
                                            </div>
                                        </div>

                                        {/* User Info at Bottom */}
                                        <div className="py-2 flex items-center gap-2 sm:gap-3">
                                            <img
                                                src={`${project.userId?.profilePicture || "http://localhost:5000/uploads/default-profile.jpg"}`}
                                                alt={project.userId?.name || "Unknown"}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div className="flex flex-col">
                                                <h2 className={`font-semibold text-sm sm:text-base break-words max-w-[180px] sm:max-w-[220px] md:max-w-full ${theme === "dark" ? "text-white" : "text-black"}`}>
                                                    {project.title}
                                                </h2>

                                                <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                    {project.userId?.name || "Unknown User"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 mt-6">
                            <p className="text-lg">No projects found</p>
                            {activeCategory !== "All" && (
                                <button
                                    onClick={() => handleCategoryChange("All")}
                                    className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-full text-sm hover:bg-purple-600"
                                >
                                    View All Projects Instead
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Load More Button - Only show if there are projects */}
                {filteredProjects.length > 0 && !loading && (
                    <div className="flex justify-center mt-6 sm:mt-8 pb-8">
                        <button
                            className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full text-sm sm:text-base font-medium cursor-pointer ${theme === "dark" ? "bg-purple-600 text-white" : "bg-purple-200 text-purple-600"}`}
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;