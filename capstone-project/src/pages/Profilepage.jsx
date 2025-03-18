import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/toastStyles.css";

const Profilepage = () => {
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [bio, setBio] = useState('');
    const [dribbbleProfile, setDribbbleProfile] = useState('');
    const [behanceProfile, setBehanceProfile] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const getCustomToastStyle = (theme) => ({
        borderRadius: "5px",
        padding: "16px",
        fontSize: "16px",
        fontWeight: "500",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        boxShadow: theme === "dark"
            ? "0px 4px 10px rgba(255, 255, 255, 0.2)"
            : "0px 4px 10px rgba(0, 0, 0, 0.15)",
        background: theme === "dark" ? "#181818" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#333333",
        border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #ddd",
        width: "400px"
    });
    
    useEffect(() => {
        fetchUser();
    }, [navigate]);

    const fetchUser = async () => {
        try {
            const res = await axios.get("http://localhost:5000/auth/me", {
                withCredentials: true,
            });
            console.log("🟢 User Data Received:", res.data);


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

    if (!user) {
        return <div className={`flex items-center justify-center h-screen w-screen ${theme === "dark" ? "bg-[#1E1E1E] text-white" : "bg-white text-black"}`}>
            <h1 className="text-center text-xl font-semibold tracking-wide animate-bounce bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                Loading...
            </h1>
        </div>
    }

    const handleprofileChange = (event) => {
        event.preventDefault();
        setProfileImage(event.target.files[0]);
    };
    const handleCoverChange = (event) => {
        event.preventDefault();
        setCoverImage(event.target.files[0]);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
    
        const isValidDribbble = (url) => 
            /^https?:\/\/(www\.)?dribbble\.com\/[a-zA-Z0-9_-]+\/?$/.test(url);
    
        const isValidBehance = (url) => 
            /^https?:\/\/(www\.)?behance\.net\/[a-zA-Z0-9_-]+\/?$/.test(url);
    
        const isDribbbleValid = isValidDribbble(dribbbleProfile);
        const isBehanceValid = isValidBehance(behanceProfile);
    
        if (!isDribbbleValid && !isBehanceValid) {
            toast("Both Dribbble & Behance links are not valid!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progressClassName: "Toastify__progress-bar",
                className: "custom-toast",
                style: getCustomToastStyle(theme),
                className: theme === "dark" ? "dark-theme" : "light-theme",
            });
            return;
        }
    
        if (!isDribbbleValid) {
            toast("Dribbble link is not valid!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progressClassName: "Toastify__progress-bar",
                className: "custom-toast",
                style: getCustomToastStyle(theme),
                className: theme === "dark" ? "dark-theme" : "light-theme",
            });
            return;
        }
    
        if (!isBehanceValid) {
            toast("Behance link is not valid!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progressClassName: "Toastify__progress-bar",
                className: "custom-toast",
                style: getCustomToastStyle(theme),
                className: theme === "dark" ? "dark-theme" : "light-theme",
            });
            return;
        }
    
        const formData = new FormData();
        if (profileImage) formData.append("profileImage", profileImage);
        if (coverImage) formData.append("coverImage", coverImage);
        formData.append("bio", bio);
        formData.append("dribbbleProfile", dribbbleProfile);
        formData.append("behanceProfile", behanceProfile);
    
        try {
            const response = await axios.post(
                "http://localhost:5000/auth/updateprofile",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
            if (response.status === 200) {
                toast.success("✅ Profile updated successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progressClassName: "Toastify__progress-bar",
                    className: "custom-toast",
                    style: getCustomToastStyle(theme),
                    className: theme === "dark" ? "dark-theme" : "light-theme",
                });
                setIsPopupOpen(false);
                fetchUser();
            }
    
            console.log(response.data);
        } catch (error) {
            console.error("Upload error:", error.response?.data || error.message);
        }
    };
    

    return (
        <>
            <Helmet>
                <title>DesignDeck - Profile Page {user.name}</title>
            </Helmet>
            <ToastContainer />
            <Navbar />
            <div className="min-h-screen bg-gray-100 mt-13">
                {/* Profile Section */}
                <div className="w-full flex flex-col items-center">
                    {/* Banner Section */}
                    <div className="w-full max-w-full h-40 sm:h-48 md:h-60">
                        <img
                            src={user.bannerImage || "/public/image.png"}
                            alt="Gradient Banner"
                            className="w-full h-full object-cover"
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
                                    src={user.profilePicture || (theme === "dark"
                                        ? "https://i.pinimg.com/736x/07/66/d1/0766d183119ff92920403eb7ae566a85.jpg"
                                        : "https://static.thenounproject.com/png/642902-200.png")}
                                    alt="User"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="pl-2 sm:pl-48 w-full pt-16 sm:pt-0 flex flex-col gap-3 sm:gap-5">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl sm:text-2xl font-semibold">{user.name}</h2>
                                <p className={`text-sm w-full sm:w-[70%] md:w-[50%] lg:w-[30%] break-words ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                    {user.bio || "No Bio"}
                                </p>
                            </div>
                            <div>
                                <button
                                    onClick={() => setIsPopupOpen(true)}
                                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium flex items-center gap-2 transition cursor-pointer ${theme === "dark" ? "bg-blue-900 text-blue-300 hover:bg-blue-800" : "bg-[#C3D7FF] text-[#0057FF] hover:bg-[#A9C4FF]"}`}
                                >
                                    <FaUserEdit className="text-lg" /> Edit Profile
                                </button>
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

                {/* My Projects Section */}
                <div className={`max-w-full mx-auto p-4 sm:p-6 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                    <h3 className={`text-xl font-semibold border-b-2 pb-2 w-[30%] sm:w-[20%] md:w-[15%] lg:w-[10%] ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
                        My Projects
                    </h3>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                        {/* Sample Project Cards */}
                        {[
                            { title: "Fitme app", img: "https://cdn.dribbble.com/userupload/36848296/file/original-8f9bf66f9b3c64857e1c49d26dfc1a5d.jpg?format=webp&resize=450x338&vertical=center" },
                            { title: "NFM Group", img: "https://cdn.dribbble.com/userupload/36937294/file/original-7c320687d1da9efc6cfd636b7a7fe0d5.jpg?format=webp&resize=450x338&vertical=center" },
                            { title: "Block13 Promo Board Design", img: "https://cdn.dribbble.com/userupload/36999634/file/original-8300df08add332e47113859ad01fc95a.jpg?format=webp&resize=1200x900&vertical=center" },
                            { title: "Minimalist Duck Logo", img: "https://cdn.dribbble.com/userupload/36992766/file/original-fcb25abdaa6f3ab9ab7d043aa93c0256.jpg?resize=1200x900&vertical=center" },
                            { title: "Solar Gate-Investing Dashboard", img: "https://cdn.dribbble.com/userupload/36931891/file/original-d7f77534f6e882cc40a418e261314863.jpg?format=webp&resize=450x338&vertical=center" },
                        ].map((project, index) => (
                            <div key={index} className={`rounded-lg p-3 text-center ${theme === "dark" ? "bg-black" : "bg-white"}`}>
                                <img src={project.img} alt={project.title} className="rounded-lg w-full h-40 sm:h-48 md:h-56 lg:h-65 object-cover" />
                                <div className="flex items-center justify-between mt-1">
                                    <p className="mt-2 text-base sm:text-lg font-medium truncate">{project.title}</p>
                                    <div className={`text-xs sm:text-sm flex justify-center items-center gap-1 mt-1 px-2 py-1 rounded-full ${theme === "dark" ? "bg-blue-900 text-blue-300" : "bg-[#D5E0FF] text-blue-500"}`}>
                                        <i className={`ri-heart-fill ${theme === "dark" ? "text-blue-500" : " text-blue-500"}`}></i> 582
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Upload Project Card */}
                        <div className={`shadow-lg rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center w-full h-40 sm:h-48 md:h-56 lg:h-70 relative ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                            <div className={`rounded-full w-12 h-12 sm:w-15 sm:h-15 flex items-center justify-center ${theme === "dark" ? "bg-gray-600 text-gray-300" : "bg-[#DCE6FF] text-[#376CFF]"}`}>
                                <Link to="/upload"><i className="ri-function-add-fill text-2xl sm:text-3xl"></i></Link>
                            </div>
                            <p className="mt-3 text-xl sm:text-2xl font-medium">Upload Project</p>
                            <p className="text-xs sm:text-sm text-center w-full sm:w-[80%] md:w-[70%]">
                                Show your creativity by uploading it to world.
                            </p>
                        </div>
                    </div>
                </div>

                {isPopupOpen && (
                    <div
                        className="fixed h-screen w-screen inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setIsPopupOpen(false)}
                    >
                        <div
                            className={`rounded-xl p-4 sm:p-6 w-full sm:w-[90%] max-w-md shadow-lg relative flex flex-col justify-center ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className={`absolute top-3 right-4 text-2xl cursor-pointer transition ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}
                            >
                                &times;
                            </button>

                            {/* Title */}
                            <h2 className="mt-4 font-medium">Update Your Profile</h2>
                            <hr className={`border-t-2 w-36 sm:w-39 mt-1 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`} />

                            {/* Form */}
                            <div className="mt-4">
                                {/* Banner Image Upload */}
                                <label className="font-medium text-sm block">Banner Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCoverChange}
                                    className={`w-full p-2 border rounded-lg mt-2 text-sm ${theme === "dark" ? "border-gray-600 bg-black text-white" : "border-[#B7B7B7] bg-white text-black"}`}
                                />

                                {/* Profile Image Upload */}
                                <label className="font-medium text-sm block mt-2">Profile Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleprofileChange}
                                    className={`w-full p-2 border rounded-lg mt-2 text-sm ${theme === "dark" ? "border-gray-600 bg-black text-white" : "border-[#B7B7B7] bg-white text-black"}`}
                                />

                                {/* Bio */}
                                <label className="font-medium text-sm mt-2 block">Bio</label>
                                <textarea
                                    className={`w-full p-2 border rounded-lg mt-2 text-sm transition-all ${theme === "dark" ? "border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-400 focus:outline-none" : "border-gray-300 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"}`}
                                    placeholder="Tell something about yourself"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows="2"
                                ></textarea>

                                {/* Dribbble Link */}
                                <label className="font-medium text-sm mt-1 block">Dribbble Profile</label>
                                <input
                                    type="url"
                                    className={`w-full p-2 border rounded-lg mt-2 text-sm transition-all ${theme === "dark" ? "border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-400 focus:outline-none" : "border-gray-300 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"}`}
                                    placeholder="Enter your Social Media link"
                                    value={dribbbleProfile}
                                    onChange={(e) => {
                                        setDribbbleProfile(e.target.value);
                                    }}
                                />
                                {/* Behance Link */}
                                <label className="font-medium text-sm mt-1 block">Behance Profile</label>
                                <input
                                    type="url"
                                    className={`w-full p-2 border rounded-lg mt-2 text-sm transition-all ${theme === "dark" ? "border-gray-600 bg-black text-white focus:ring-2 focus:ring-blue-400 focus:outline-none" : "border-gray-300 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"}`}
                                    placeholder="Enter your Social Media link"
                                    value={behanceProfile}
                                    onChange={(e) => {
                                        setBehanceProfile(e.target.value);
                                    }}
                                />
                            </div>

                            {/* Save Changes Button */}
                            <button className={`text-md font-medium w-full py-3 mt-4 rounded-full cursor-pointer ${theme === "dark" ? "bg-blue-700 text-white hover:bg-blue-600" : "bg-[#376CFF] text-white hover:bg-[#2D5BEA]"}`}
                                onClick={handleUpdateProfile}

                            >
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
