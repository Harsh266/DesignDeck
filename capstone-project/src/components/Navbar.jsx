import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const fetchUserRan = useRef(false);
  const { theme, toggleTheme } = useContext(ThemeContext);// ✅ Prevents double fetch in Strict Mode

  // ✅ Fetch user data
  const fetchUser = async () => {
    console.log("🟡 Fetching user data...");
    try {
      const res = await axios.get("http://localhost:5000/auth/me", {
        withCredentials: true, // Send cookies for authentication
      });

      console.log("🟢 User Data Received:", res.data);

      if (res.data && res.data._id) {
        setUser(res.data); // ✅ Update user state
        console.log("🟣 User state updated:", res.data);
      } else {
        setUser(null);
        console.log("🟣 No valid user found, setting user to null");
      }
    } catch (error) {
      console.error("❌ Error fetching user:", error.response?.data?.message || error.message);
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

  // ✅ Logout Function
  const handleLogout = async () => {
    console.log("🟡 Logging out...");

    try {
      await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
      console.log("🟢 Logout successful");

      setUser(null);
      setShowPopup(false);
      navigate("/landingpage");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  return (
    <nav
      className={`flex w-full justify-between items-center px-6 py-3 fixed top-0 left-0 backdrop-blur-md z-50 transition-all duration-300 ${theme === "dark" ? "bg-[#000000c3] text-white" : "bg-[#ffffffc3] text-black"}`}
    >
      {/* Logo */}
      <Link to="/dashboard">
        <h1 className="text-lg font-semibold">Design Deck</h1>
      </Link>

      <div className="flex items-center gap-4 relative">
        {user ? (
          <>
            {/* User Profile Section */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowPopup(!showPopup)}
            >
              <img
                src={user.profilePicture || "https://static.thenounproject.com/png/642902-200.png"}
                alt="User"
                className="object-cover object-top w-10 h-10 rounded-full"
              />
              <div>
                <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {user.name}
                </p>
                <p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                  {user.email}
                </p>

              </div>
            </div>

            {/* Notification Icon */}
            <button
              className={`p-2 rounded-full cursor-pointer h-10 w-10 flex items-center justify-center ${theme === "dark" ? "bg-gray-700 text-white" : "bg-[#DCE6FF] text-[#9091FF]"
                }`}
            >
              <i className="ri-notification-2-line text-[20px]"></i>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 cursor-pointer rounded-full h-10 w-10 flex items-center justify-center transition-all duration-300 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-[#DCE6FF] text-[#9091FF]"
                }`}
            >
              {theme === "dark" ? (
                <Sun className="text-2xl" />
              ) : (
                <Moon className="text-2xl" />
              )}
            </button>

            {/* Profile Popup */}
            {showPopup && (
              <div
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
                    src={user.profilePicture || "https://static.thenounproject.com/png/642902-200.png"}
                    alt="User"
                    className="w-20 h-20 rounded-full object-cover object-top"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{user.name}</h2>
                    <p className="text-sm mt-1 font-semibold">{user.email}</p>

                    {/* Social Media Links */}
                    <div className="flex flex-col mt-2 text-sm">
                      <div className="flex items-center gap-2">
                        <i className="ri-instagram-fill text-lg"></i> @instaacc
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-behance-fill text-lg"></i> @Behanceacc
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
    </nav>
  );
};

export default Navbar;
