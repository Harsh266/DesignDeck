import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import api from "../services/api";
import { ThemeContext } from "../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = api.defaults.baseURL;

const getCustomToastStyle = (theme) => ({
    borderRadius: "5px",
    padding: "18px 25px",
    fontSize: "14px",
    fontWeight: "500",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    boxShadow: theme === "dark"
        ? "0px 4px 10px rgba(255, 255, 255, 0.2)"
        : "0px 4px 10px rgba(0, 0, 0, 0.1)",
    background: theme === "dark" ? "#181818" : "#fff",
    color: theme === "dark" ? "#fff" : "#333",
    border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #ddd",
    width: "320px",
});

const Profilepageothers = () => {
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const { theme } = useContext(ThemeContext);
    const { userId } = useParams();

    // Form data state
    const [contactForm, setContactForm] = useState({
        projectDetails: "",
        timeline: "",
        budget: ""
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/api/projects/users/${userId}`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setUser(response.data.user);
                } else {
                    console.error("Failed to fetch user profile");
                    setError("Failed to fetch user profile");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setError("Error loading user profile");
            }
        };

        const fetchUserProjects = async () => {
            try {
                const response = await api.get(`/api/projects/projects/user/${userId}`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setProjects(response.data.projects);
                } else {
                    console.error("Failed to fetch user projects");
                }
            } catch (error) {
                console.error("Error fetching user projects:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserProfile();
            fetchUserProjects();
        }
    }, [userId]);

    const getDefaultImage = (type) => {
        return `${API_BASE_URL}/uploads/default-${type}.jpg`;
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactForm({
            ...contactForm,
            [name]: value
        });
    };

    // Handle form submission
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!contactForm.projectDetails.trim()) {
            toast("Please provide project details", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: getCustomToastStyle(theme),
                className: theme === "dark" ? "dark-theme" : "light-theme",
            });
            return;
        }

        setIsSending(true);

        try {
            const response = await api.post(
                `/api/projects/users/contact`,
                {
                    recipientId: userId,
                    message: "I'm interested in working with you!",
                    projectDetails: contactForm.projectDetails,
                    timeline: contactForm.timeline,
                    budget: contactForm.budget
                },
                { withCredentials: true }
            );

            if (response.data.success) {
                toast("Message sent successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: getCustomToastStyle(theme),
                    className: theme === "dark" ? "dark-theme" : "light-theme",
                });
                setContactForm({
                    projectDetails: "",
                    timeline: "",
                    budget: ""
                });
                setIsPopupOpen(false);
            } else {
                toast(response.data.message || "Failed to send message", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: getCustomToastStyle(theme),
                    className: theme === "dark" ? "dark-theme" : "light-theme",
                });
            }
        } catch (error) {
            toast(error.response?.data?.message || "Error sending message. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: getCustomToastStyle(theme),
                className: theme === "dark" ? "dark-theme" : "light-theme",
            });
        } finally {
            setIsSending(false);
        }
    };

    if (error || !user) {
        return (
            <>
                <Navbar />
                <div className={`min-h-screen flex flex-col items-center justify-center px-4 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                    <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
                    <p className="text-center">{error || "The user profile you're looking for doesn't exist or has been removed."}</p>
                    <button
                        onClick={() => window.history.back()}
                        className={`mt-6 px-4 py-2 rounded-full text-sm font-medium ${theme === "dark" ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-purple-200 hover:bg-purple-300 text-purple-600"} transition-colors`}
                    >
                        Go Back
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>{user.name} - DesignDeck Profile</title>
            </Helmet>
            <Navbar />
            <ToastContainer toastClassName={() => "custom-toast"} />
            <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} mt-13`}>
                {/* Profile Section */}
                <div className="w-full flex flex-col items-center">
                    {/* Banner Section */}
                    <div className="w-full max-w-full h-40 sm:h-48 md:h-60">
                        <img
                            src={user.bannerImage || getDefaultImage("banner")}
                            alt="Profile Banner"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = getDefaultImage("banner");
                            }}
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
                                    src={user.profilePicture || getDefaultImage("profile")}
                                    alt={user.name}
                                    className="w-full h-full object-cover rounded-2xl"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = getDefaultImage("profile");
                                    }}
                                />
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="pl-2 sm:pl-48 w-full pt-16 sm:pt-0 flex flex-col gap-3 sm:gap-5">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl sm:text-2xl font-semibold">{user.name}</h2>
                                <p className={`text-sm w-full sm:w-[70%] md:w-[50%] lg:w-[30%] break-words ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    {user.bio || "No bio provided"}
                                </p>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="mt-4 sm:mt-0 sm:ml-auto flex gap-3 self-end sm:self-auto">
                            {/* Instagram */}
                            <div className="relative group">
                                <a
                                    href={user.dribbbleProfile || "#"}
                                    target={user.dribbbleProfile ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 p-2 rounded-full flex items-center justify-center transition-all cursor-pointer  hover:scale-110 active:scale-95 "
                                    style={{
                                        backgroundColor: theme === "dark" ? "#833AB4" : "#FEE2FE",
                                        color: theme === "dark" ? "#FBC2EB" : "#C13584"
                                    }}
                                >
                                    <i className="ri-dribbble-line text-xl"></i>
                                </a>
                            </div>

                            {/* Behance */}
                            <div className="relative group">
                                <a
                                    href={user.behanceProfile || "#"}
                                    target={user.behanceProfile ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 p-2 rounded-full flex items-center justify-center transition-all cursor-pointer  hover:scale-110 active:scale-95 "
                                    style={{
                                        backgroundColor: theme === "dark" ? "#1E40AF" : "#DBEAFE",
                                        color: theme === "dark" ? "#93C5FD" : "#3B82F6"
                                    }}
                                >
                                    <i className="ri-behance-line text-xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Section */}
                <div className={`max-w-full mx-auto p-4 sm:p-6 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
                    <h3 className={`text-lg sm:text-xl font-semibold border-b-2 pb-2 w-20 sm:w-24 md:w-28 ${theme === "dark" ? "border-gray-600" : "border-black"}`}>
                        Projects
                    </h3>

                    {projects?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                            {projects.map((project, index) => (
                                <Link to={`/view/${project._id}`} key={project._id || index} className="block">
                                    <div
                                        className={`group rounded-lg p-2 sm:p-3 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
                                    >
                                        {/* Media Handling */}
                                        <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 rounded-lg overflow-hidden cursor-pointer">
                                            {project.firstImage || project.thumbnail || (project.images && project.images.length > 0) ? (
                                                <>
                                                    {/* Show Image by Default */}
                                                    <img
                                                        src={
                                                            project.thumbnail ||
                                                            `${API_BASE_URL}${project.firstImage || project.images[0]}` ||
                                                            "/default-thumbnail.jpg"
                                                        }
                                                        alt={project.title}
                                                        className="w-full h-full object-cover rounded-lg group-hover:hidden"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = getDefaultImage ? getDefaultImage("project") : "/uploads/default-project.jpg";
                                                        }}
                                                    />
                                                    {/* Show Video on Hover if available, otherwise show same image */}
                                                    {project.videos && project.videos.length > 0 ? (
                                                        <video
                                                            className="w-full h-full object-cover rounded-lg hidden group-hover:block"
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                        >
                                                            <source src={`${API_BASE_URL}${project.videos[0]}`} />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    ) : (
                                                        <img
                                                            src={
                                                                project.thumbnail ||
                                                                `${API_BASE_URL}${project.firstImage || project.images[0]}` ||
                                                                "/default-thumbnail.jpg"
                                                            }
                                                            alt={project.title}
                                                            className="w-full h-full object-cover rounded-lg hidden group-hover:block"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = getDefaultImage ? getDefaultImage("project") : "/uploads/default-project.jpg";
                                                            }}
                                                        />
                                                    )}
                                                </>
                                            ) : project.videos && project.videos.length > 0 ? (
                                                <>
                                                    {/* For video-only projects: Show first frame of video as static thumbnail */}
                                                    <div className="w-full h-full group-hover:hidden">
                                                        <video
                                                            className="w-full h-full object-cover rounded-lg"
                                                            muted
                                                            playsInline
                                                            preload="metadata"
                                                        >
                                                            <source src={`${API_BASE_URL}${project.videos[0]}`} />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                    {/* Play video on hover */}
                                                    <video
                                                        className="w-full h-full object-cover rounded-lg hidden group-hover:block"
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                    >
                                                        <source src={`${API_BASE_URL}${project.videos[0]}`} />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                </>
                                            ) : (
                                                <div className={`rounded-lg w-full h-full flex items-center justify-center ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
                                                    <span className="text-gray-500">No preview available</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mt-1">
                                            <p className="mt-2 text-base text-start sm:text-lg font-medium line-clamp-3">
                                                {project.title}
                                            </p>

                                            <div className={`text-xs sm:text-sm flex justify-center items-center gap-1 mt-1 px-2 py-1 rounded-full ${theme === "dark" ? "bg-blue-900 text-blue-300" : "bg-[#D5E0FF] text-blue-500"}`}>
                                                <i className={`ri-heart-fill ${theme === "dark" ? "text-blue-500" : " text-blue-500"}`}></i>
                                                {project.likeCount || 0}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-4">
                            <p className={`text-lg font-semibold ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                No projects to display.
                            </p>
                        </div>
                    )}
                </div>

                {/* Get in Touch Section */}
                <div className="w-full flex items-center justify-center p-4 sm:p-6 md:p-10">
                    <div className={`w-full h-40 sm:h-48 md:h-50 rounded-lg sm:rounded-xl md:rounded-[25px] flex items-center justify-center relative shadow-lg ${theme === "dark" ? "bg-gradient-to-r from-gray-700 to-gray-900 shadow-gray-700/30" : "bg-gradient-to-r from-blue-500 to-blue-500 shadow-blue-800/30"}`}>
                        <button onClick={() => setIsPopupOpen(true)} className={`text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-md cursor-pointer ${theme === "dark" ? "bg-gray-700 text-white" : "bg-blue-400 text-white"}`}>
                            Get in Touch
                        </button>
                    </div>
                </div>

                {/* Contact Popup */}
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
                                    src={user.profilePicture || getDefaultImage("profile")}
                                    alt={user.name}
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = getDefaultImage("profile");
                                    }}
                                />
                                <div>
                                    <h3 className="font-semibold">{user.name}</h3>
                                    <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-500"} text-xs sm:text-sm`}>
                                        Responds within a few hours
                                    </p>
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="mt-4 font-medium text-sm sm:text-base">Let's Discuss a Design Opportunity!</h2>
                            <hr className={`border-t-2 w-full sm:w-72 mt-1 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />

                            {/* Form */}
                            <form onSubmit={handleSendMessage} className="mt-4">
                                <label className="font-medium text-xs sm:text-sm">Project Details</label>
                                <textarea
                                    name="projectDetails"
                                    value={contactForm.projectDetails}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 border rounded-lg mt-2 text-xs sm:text-sm transition-all ${theme === "dark" ? "border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-400 focus:outline-none" : "border-gray-300 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"}`}
                                    placeholder="Please describe your project"
                                    rows="4"
                                ></textarea>

                                <label className="font-medium text-xs sm:text-sm mt-2 block">Project Timeline</label>
                                <input
                                    name="timeline"
                                    value={contactForm.timeline}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 border rounded-lg mt-1 sm:mt-2 text-xs sm:text-sm transition-all ${theme === "dark" ? "border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-400 focus:outline-none" : "border-gray-300 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"}`}
                                    placeholder="Please write your project timeline"
                                />

                                <label className="font-medium text-xs sm:text-sm mt-2 block">Project Budget</label>
                                <input
                                    name="budget"
                                    value={contactForm.budget}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 border rounded-lg mt-1 sm:mt-2 text-xs sm:text-sm transition-all ${theme === "dark" ? "border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-400 focus:outline-none" : "border-gray-300 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"}`}
                                    placeholder="Enter amount"
                                    type="number"
                                />

                                {/* Send Message Button */}
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className={`text-sm sm:text-md font-medium w-full py-2 sm:py-3 mt-4 rounded-full cursor-pointer transition-all ${isSending
                                            ? `${theme === "dark" ? "bg-gray-600 text-gray-300" : "bg-gray-300 text-gray-500"}`
                                            : `${theme === "dark" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-[#376CFF] hover:bg-[#2C5CFF] text-white"}`
                                        }`}
                                >
                                    {isSending ? (
                                        <span>Sending...</span>
                                    ) : (
                                        <><i className="ri-send-plane-line"></i> Send Message</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Profilepageothers;