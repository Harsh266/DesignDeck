import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/auth/user"; // Backend API to fetch user data

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Fetch User Data when Navbar loads
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="flex w-full justify-between items-center px-6 py-3 fixed top-0 left-0 bg-[#ffffffc3] backdrop-blur-md z-50">
      {/* Logo */}
      <Link to="/dashboard">
        <h1 className="text-lg font-semibold">Design Deck</h1>
      </Link>

      {/* User Profile & Notification */}
      <div className="flex items-center gap-4 relative">
        {user ? (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowPopup(!showPopup)}
          >
            {/* ✅ Dynamic User Avatar */}
            <img
              src={user.avatar || "https://via.placeholder.com/100"} 
              alt="User"
              className="object-cover object-top w-10 h-10 rounded-full"
            />
            <div>
              {/* ✅ Dynamic Username & Email */}
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        ) : (
          <Link to="/signin">
            <button className="text-blue-500 font-medium">Login</button>
          </Link>
        )}

        {/* Notification Icon */}
        <button className="p-2 rounded-full bg-[#DCE6FF] h-10 w-10 flex items-center justify-center">
          <i className="ri-notification-2-line text-[20px] text-[#9091FF]"></i>
        </button>
      </div>

      {/* Profile Popup */}
      {showPopup && user && (
        <div className="fixed top-16 right-5 w-80 bg-white shadow-xl rounded-2xl p-5 transition-all duration-200 ease-in-out z-50">
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-500 cursor-pointer"
            onClick={() => setShowPopup(false)}
          >
            <i className="ri-close-line text-lg"></i>
          </button>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            {/* ✅ Dynamic Profile Image */}
            <img
              src={user.avatar || "https://via.placeholder.com/100"}
              alt="User"
              className="w-20 h-20 rounded-full object-cover object-top"
            />

            {/* ✅ Dynamic User Details */}
            <div>
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="text-sm mt-1 font-semibold">{user.email}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-4 border-t pt-3 text-sm">
            <Link to="/profilepage">
              <button className="text-blue-600 font-medium cursor-pointer">
                View Profile
              </button>
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/signin";
              }}
              className="text-red-500 font-medium cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
