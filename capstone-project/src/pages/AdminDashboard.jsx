import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon, Bell, Users, LogOut, Menu } from "lucide-react"; // Added Menu icon
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [message, setMessage] = useState("");
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [users, setUsers] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const [toastShown, setToastShown] = useState(false);

    const getCustomToastStyle = (theme) => ({
        borderRadius: "8px",
        padding: "16px",
        fontSize: "14px",
        fontWeight: "500",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: theme === "dark"
            ? "0px 4px 15px rgba(255, 255, 255, 0.15)"
            : "0px 4px 15px rgba(0, 0, 0, 0.1)",
        background: theme === "dark" ? "#222" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
        border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #eaeaea",
        width: "320px",
    });

    useEffect(() => {
        axios.get("http://localhost:5000/auth/admin-dashboard", { withCredentials: true })
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

    useEffect(() => {
        const fetchUsers = () => {
            axios.get("http://localhost:5000/auth/all-users", { withCredentials: true })
                .then((res) => setUsers(res.data))
                .catch((err) => console.error("Error fetching users:", err));
        };
    
        fetchUsers(); // Fetch immediately on page load
        const interval = setInterval(fetchUsers, 5000); // Auto-refresh every 5 sec
    
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

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
    
        axios.post(
            "http://localhost:5000/notifications/admin-notifications",
            { message },
            { withCredentials: true }
        )
        .then((response) => {
            
            if (response.data.success) {
                toast(response.data.message || "Notification sent successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: getCustomToastStyle(theme),
                    className: theme === "dark" ? "dark-theme" : "light-theme",
                });
                setMessage(""); // Clear input field after success
            } else {
                toast(response.data.message || "Something went wrong!", {
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
        })
        .catch((error) => {
            toast(error.response?.data?.message || "Failed to send notification!", {
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
        axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
        axios.get("http://localhost:5000/auth/all-users", { withCredentials: true })
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

    if (isAdmin === null) return (
        <div className={`flex items-center justify-center h-screen w-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h1 className="text-xl font-semibold tracking-wide bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Loading Dashboard...
                </h1>
            </div>
        </div>
    );

    return (
        <>
            <ToastContainer />
            <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"} transition-colors duration-300`}>
                {/* Navbar */}
                <nav className={`flex flex-col w-full items-end px-4 sm:px-6 py-3 fixed top-0 left-0 backdrop-blur-2xl z-50 ${theme === "dark" ? "bg-[#000000f3] text-white" : "bg-[#ffffffc3] text-black"
                    }`}>
                    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                        <div className="flex justify-between h-12">
                            <div className="flex items-center">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${theme === "dark" ? "bg-blue-600" : "bg-blue-500"} flex items-center justify-center text-white font-bold text-lg sm:text-xl`}>
                                    A
                                </div>
                                <h1 className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold tracking-tight">AdminPanel</h1>
                            </div>

                            {/* Desktop menu */}
                            <div className="hidden md:flex items-center space-x-4">
                                <div className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium">
                                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span>Dashboard</span>
                                </div>

                                <button
                                    onClick={toggleTheme}
                                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
                                >
                                    {theme === "dark" ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
                                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span>Logout</span>
                                </button>
                            </div>

                            {/* Mobile menu button */}
                            <div className="flex items-center md:hidden">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className={`p-2 rounded-md ${theme === "dark" ? "text-gray-400 hover:bg-gray-700" : "text-gray-500 hover:bg-gray-100"}`}
                                >
                                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden w-full">
                            <div className={`px-2 pt-2 pb-3 space-y-1 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                                <div className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${theme === "dark" ? "text-white bg-gray-700" : "text-gray-800 bg-gray-100"}`}>
                                    <Users className="h-5 w-5" />
                                    <span>Dashboard</span>
                                </div>

                                <button
                                    onClick={toggleTheme}
                                    className={`flex w-full items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"} transition-colors`}
                                >
                                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                    <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className={`flex w-full items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-red-500 ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors`}
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Main content */}
                <div className="pt-20 sm:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Header */}
                    <div className={`mb-6 sm:mb-8 pb-4 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p className={`mt-2 text-sm sm:text-base ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Welcome to your control center</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className={`p-4 sm:p-6 rounded-xl shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                            <h3 className={`text-base sm:text-lg font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Total Users</h3>
                            <p className="text-2xl sm:text-3xl font-bold mt-2">{users.length}</p>
                        </div>
                        <div className={`p-4 sm:p-6 rounded-xl shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                            <h3 className={`text-base sm:text-lg font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Active Users</h3>
                            <p className="text-2xl sm:text-3xl font-bold mt-2">{users.filter(user => user.isLoggedIn).length}</p>
                        </div>
                        <div className={`p-4 sm:p-6 rounded-xl shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                            <h3 className={`text-base sm:text-lg font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Offline Users</h3>
                            <p className="text-2xl sm:text-3xl font-bold mt-2">{users.filter(user => !user.isLoggedIn).length}</p>
                        </div>
                    </div>

                    {/* Notification Section */}
                    <div className={`mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <Bell className={`h-4 w-4 sm:h-5 sm:w-5 ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`} />
                            <h2 className="text-lg sm:text-xl font-semibold">Send Notification</h2>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter notification message"
                                className={`w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${theme === "dark"
                                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                                    : "border-gray-300 bg-white text-gray-800 placeholder-gray-400"
                                    } transition-colors`}
                            />
                            <button
                                onClick={sendNotification}
                                className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 mt-3 sm:mt-0 rounded-lg ${theme === "dark"
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-blue-500 hover:bg-blue-600"
                                    } text-white font-medium transition-colors whitespace-nowrap flex-shrink-0`}
                            >
                                Send Notification
                            </button>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className={`rounded-xl shadow-md overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                        <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                <Users className={`h-4 w-4 sm:h-5 sm:w-5 ${theme === "dark" ? "text-blue-400" : "text-blue-500"}`} />
                                <h2 className="text-lg sm:text-xl font-semibold">User Management</h2>
                            </div>
                            <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                All registered users and their current status
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr className={`text-left ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                                                <th className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm font-medium">Name</th>
                                                <th className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm font-medium">Email</th>
                                                <th className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm font-medium hidden sm:table-cell">Last Login</th>
                                                <th className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm font-medium">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {users.map((user) => (
                                                <tr key={user._id} className={`${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"} transition-colors`}>
                                                    <td className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm font-medium">{user.name}</td>
                                                    <td className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[180px] md:max-w-none">{user.email}</td>
                                                    <td className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm hidden sm:table-cell">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</td>
                                                    <td className="px-3 py-3 sm:px-4 md:px-6 text-xs sm:text-sm">
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${user.isLoggedIn
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                                            }`}>
                                                            {user.isLoggedIn ? "Online" : "Offline"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;