import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react"; // Import icons
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [message, setMessage] = useState("");
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [toastShown, setToastShown] = useState(false); // Prevents repeated toast messages

    const getCustomToastStyle = (theme) => ({
        borderRadius: "5px",
        padding: "16px",
        fontSize: "14px",
        fontWeight: "500",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: theme === "dark"
            ? "0px 4px 10px rgba(255, 255, 255, 0.2)"
            : "0px 4px 10px rgba(0, 0, 0, 0.1)",
        background: theme === "dark" ? "#181818" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
        border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #ddd",
        width: "320px",
    });

    useEffect(() => {
        axios.get("https://designdeck-backend.onrender.com/auth/admin-dashboard", { withCredentials: true })
            .then((res) => {
                if (res.data.isAdmin) {
                    setIsAdmin(true);
                    if (!toastShown) {
                        toast("Admin logged in successfully!", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            style: getCustomToastStyle(theme),
                            className: theme === "dark" ? "dark-theme" : "light-theme",
                        });
                        setToastShown(true);
                    }
                } else {
                    toast("Access Denied: Admins Only!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: getCustomToastStyle(theme),
                        className: theme === "dark" ? "dark-theme" : "light-theme",
                    });
                    navigate("/dashboard");
                }
            })
            .catch(() => {
                toast("Unauthorized access!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: getCustomToastStyle(theme),
                    className: theme === "dark" ? "dark-theme" : "light-theme",
                });
                navigate("/dashboard");
            });
    }, [navigate, theme, toastShown]);

    const sendNotification = () => {
        if (!message.trim()) {
            toast("Message cannot be empty!", {
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

        axios.post("https://designdeck-backend.onrender.com/notifications/admin-notifications", { message }, { withCredentials: true })
            .then(() => {
                toast("Notification sent successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: getCustomToastStyle(theme),
                    className: theme === "dark" ? "dark-theme" : "light-theme",
                });
                setMessage("");
            })
            .catch(() => {
                toast("Failed to send notification!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: getCustomToastStyle(theme),
                    className: theme === "dark" ? "dark-theme" : "light-theme",
                });
            });
    };

    const handleLogout = () => {
        axios.post("https://designdeck-backend.onrender.com/auth/logout", {}, { withCredentials: true })
            .then(() => {
                toast("Logged out successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: getCustomToastStyle(theme),
                    className: theme === "dark" ? "dark-theme" : "light-theme",
                });
                setTimeout(() => navigate("/"), 3000);
            })
            .catch(() => {
                toast("Logout failed!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: getCustomToastStyle(theme),
                    className: theme === "dark" ? "dark-theme" : "light-theme",
                });
            });
    };

    if (isAdmin === null) return <div className={`flex items-center justify-center h-screen w-screen ${theme === "dark" ? "bg-[#1E1E1E] text-white" : "bg-white text-black"}`}>
        <h1 className="text-center text-xl font-semibold tracking-wide animate-bounce bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Loading...
        </h1>
    </div>;

    return (
        <>
            <ToastContainer />
            <div className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-black"} flex flex-col items-center p-4 sm:p-6 md:p-8`}>

                {/* Header Section */}
                <div className={`w-full max-w-4xl ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} shadow-lg rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4`}>
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>

                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="p-2 rounded-full transition-all duration-300">
                            {theme === "dark" ? (
                                <Sun className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer" />
                            ) : (
                                <Moon className="w-6 h-6 text-black hover:text-gray-500 cursor-pointer" />
                            )}
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Welcome Message */}
                <p className="text-lg font-semibold mt-4">Welcome, Admin!</p>

                {/* Notification Section */}
                <div className={`w-full max-w-3xl ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} shadow-md rounded-lg p-4 sm:p-6 mt-6`}>
                    <h2 className="text-xl font-semibold mb-4">Send Notification</h2>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter notification message"
                            className={`w-full sm:w-2/3 p-2 border ${theme === "dark" ? "border-white" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                        <button
                            onClick={sendNotification}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                        >
                            Send Notification
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
