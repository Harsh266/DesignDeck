import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import api from "../services/api";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const fetchUserRan = useRef(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const popupRef = useRef(null);

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

  // ✅ Fetch user data
  const fetchUser = async () => {
    console.log("🟡 Fetching user data...");
    try {
      const res = await api.get("/auth/me", {
        withCredentials: true, // Send cookies for authentication
      });

      console.log("🟢 User Data Received:");

      if (res.data && res.data._id) {
        setUser(res.data); // ✅ Update user state
        console.log("🟣 User state updated:");
      } else {
        setUser(null);
        console.log("🟣 No valid user found, setting user to null");
      }
    } catch (error) {
      console.error("❌ Error fetching user:",);
      setUser(null);
    }
  };

  // ✅ Load user on mount (Prevent double fetch in Strict Mode)
  useEffect(() => {
    if (!fetchUserRan.current) {
      fetchUserRan.current = true;
      fetchUser();
    }
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    console.log("🟡 Logging out...");

    try {
      const response = await api.post(
        "/auth/logout",
        {},
        { withCredentials: true } // Ensure cookies are sent
      );

      console.log("🟢 Logout successful:", response.data);

      // Clear user data
      setUser(null);
      localStorage.removeItem("user");

      // Close UI elements
      setShowPopup(false);
      setMobileMenuOpen(false);

      // Redirect after delay
      navigate("/landingpage");

    } catch (error) {
      console.error("❌ Logout failed:", error.response?.data || error.message);

      // Debugging: Check browser cookies
      console.log("Browser Cookies:", document.cookie);
    }
  };

  return (
    <nav
      className={`flex w-full justify-between items-center px-4 sm:px-6 py-3 fixed top-0 left-0 backdrop-blur-2xl z-50 ${theme === "dark" ? "bg-[#000000f3] text-white" : "bg-[#ffffffc3] text-black"
        }`}
    >
      {/* Logo */}
      <Link to="/dashboard">
        <h1 className="text-lg font-semibold">Design Deck</h1>
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4 relative">
        {user ? (
          <>
            {/* User Profile Section */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowPopup(!showPopup)}
            >
              <img
                src={user.profilePicture || `${api.defaults.baseURL}uploads/default-profile.jpg`}
                alt="User"
                className="object-cover object-top w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
              <div className="hidden sm:block">
                <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {user.name}
                </p>
                <p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                  {user.email}
                </p>
              </div>
            </div>

            {/* Notification Icon */}
            <Link to="/user-notifications"><button
              className={`p-2 rounded-full cursor-pointer h-8 w-8 md:h-10 md:w-10 flex items-center justify-center transition-all duration-300 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-[#DCE6FF] text-[#9091FF]"
                }`}
            >
              <i className="ri-notification-2-line text-[16px] md:text-[20px]"></i>
            </button></Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 cursor-pointer rounded-full h-8 w-8 md:h-10 md:w-10 flex items-center justify-center transition-all duration-300 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-[#DCE6FF] text-[#9091FF]"
                }`}
            >
              {theme === "dark" ? (
                <Sun className="text-xl md:text-2xl" />
              ) : (
                <Moon className="text-xl md:text-2xl" />
              )}
            </button>

            {/* Profile Popup */}
            {showPopup && (
              <div
                ref={popupRef}
                className={`fixed top-16 right-5 w-90 shadow-xl rounded-2xl p-5 transition-all duration-200 ease-in-out z-50 ${theme === "dark" ? "bg-[#222] text-white" : "bg-white text-black"
                  }`}
              >
                {/* Close Button */}
                <button
                  className="absolute top-3 right-3 cursor-pointer"
                  onClick={() => setShowPopup(false)}
                >
                  <i className="ri-close-line text-lg"></i>
                </button>

                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      user.profilePicture
                        ? `${user.profilePicture}`
                        : `${api.defaults.baseURL}uploads/default-profile.jpg`
                    }
                    alt="User"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{user.name}</h2>
                    <p className="text-sm mt-1 font-semibold">{user.email}</p>

                    {/* Social Media Links */}
                    <div className="flex flex-col mt-2 text-sm">
                      <div className="flex items-center gap-2">
                        <i className="ri-dribbble-line text-lg"></i>
                        <span className="break-words whitespace-normal max-w-[200px]">
                          {user.dribbbleProfile || "@Dribbbleacc"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-behance-fill text-lg"></i>
                        <span className="break-words whitespace-normal max-w-[200px]">
                          {user.behanceProfile || "@Behanceacc"}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Buttons */}
                <div
                  className={`flex justify-between items-center mt-4 border-t pt-3 text-sm ${theme === "dark" ? "text-white" : "text-black"
                    }`}
                >
                  <Link to="/profilepage">
                    <button
                      className={`font-medium cursor-pointer ${theme === "dark" ? "text-white" : "text-blue-600"
                        }`}
                      onClick={() => setShowPopup(false)}
                    >
                      View Profile
                    </button>
                  </Link>
                  <button
                    className={`font-medium cursor-pointer ${theme === "dark" ? "text-white" : "text-red-500"
                      }`}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Link to="/signin" className="text-blue-600 font-semibold">
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden fixed top-14 right-0 backdrop-blur-2xl left-0 bottom-0 p-4 z-40 ${theme === "dark" ? "bg-[#000000c3]" : "bg-[#fffffffc3]"
          }`}>
          <div className={`flex flex-col w-full items-center gap-6 pt-8 ${theme === "dark" ? "bg-black" : "bg-white"} shadow-lg rounded-lg`}>
            {user ? (
              <>
                {/* User Profile Info */}
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={user.profilePicture || `${api.defaults.baseURL}uploads/default-profile.jpg`}
                    alt="User"
                    className="w-20 h-20 rounded-full object-cover object-top"
                  />
                  <p className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                    {user.name}
                  </p>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                    {user.email}
                  </p>
                </div>

                {/* Social Media Links */}
                <div className="flex gap-4 mt-2">
                  {/* Instagram */}
                  <div className="relative group">
                    <div
                      className={`flex items-center cursor-pointer h-12 w-12 justify-center gap-2 rounded-full transition-all ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                        }`}
                    >
                      <i className="ri-dribbble-fill text-2xl"></i>
                    </div>
                    {/* Link on hover */}
                    <span className="absolute bottom-[-35px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-black text-white text-xs py-1 px-2 rounded-md shadow-lg">
                      {user.dribbbleProfile ? (
                        <a href={user.dribbbleProfile} target="_blank" rel="noopener noreferrer" className="underline">
                          {user.dribbbleProfile}
                        </a>
                      ) : "No link"}
                    </span>
                  </div>

                  {/* Behance */}
                  <div className="relative group">
                    <div
                      className={`flex items-center cursor-pointer h-12 w-12 justify-center gap-2 rounded-full transition-all ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                        }`}
                    >
                      <i className="ri-behance-fill text-2xl"></i>
                    </div>
                    {/* Link on hover */}
                    <span className="absolute bottom-[-35px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-black text-white text-xs py-1 px-2 rounded-md shadow-lg">
                      {user.behanceProfile ? (
                        <a href={user.behanceProfile} target="_blank" rel="noopener noreferrer" className="underline">
                          {user.behanceProfile}
                        </a>
                      ) : "No link"}
                    </span>
                  </div>
                </div>


                {/* Mobile Menu Actions */}
                <div className="flex items-center gap-4 mt-0">
                  {/* Notification Icon */}
                  <Link to="/user-notifications"><button
                    className={`p-3 rounded-full cursor-pointer h-12 w-12 flex items-center justify-center ${theme === "dark" ? "bg-gray-700 text-white" : "bg-[#DCE6FF] text-[#9091FF]"
                      }`}
                  >
                    <i className="ri-notification-2-line text-[22px]"></i>
                  </button></Link>

                  {/* Theme Toggle Button */}
                  <button
                    onClick={toggleTheme}
                    className={`p-3 cursor-pointer rounded-full h-12 w-12 flex items-center justify-center ${theme === "dark" ? "bg-gray-700 text-white" : "bg-[#DCE6FF] text-[#9091FF]"
                      }`}
                  >
                    {theme === "dark" ? (
                      <Sun className="text-2xl" />
                    ) : (
                      <Moon className="text-2xl" />
                    )}
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="w-full mt-6 flex flex-row gap-4 mb-4">
                  <Link
                    to="/profilepage"
                    className={`w-full text-center cursor-pointer p-3 rounded-lg ${theme === 'dark' ? ' text-white' : 'text-blue-600'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    View Profile
                  </Link>
                  <button
                    className={`w-full text-center cursor-pointer p-3 rounded-lg ${theme === 'dark' ? ' text-white' : ' text-red-500'
                      }`}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>

              </>
            ) : (
              <Link
                to="/signin"
                className="text-blue-600 font-semibold text-lg p-3 w-full text-center bg-blue-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;