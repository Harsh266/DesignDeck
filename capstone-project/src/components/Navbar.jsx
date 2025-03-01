import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const fetchUserRan = useRef(false); // ✅ Prevents double fetch in Strict Mode

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
      navigate("/signin");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  return (
    <nav className="flex w-full justify-between items-center px-6 py-3 fixed top-0 left-0 bg-[#ffffffc3] backdrop-blur-md z-50">
      {/* Logo */}
      <Link to="/dashboard">
        <h1 className="text-lg font-semibold">Design Deck</h1>
      </Link>

      {/* User Profile */}
      <div className="flex items-center gap-4 relative">
        {user ? (
          <>
            {/* ✅ Show User's Name Instead of "Sign In" */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowPopup(!showPopup)}
            >
              <img
                img src={user.image || "https://static.thenounproject.com/png/642902-200.png"}
                alt="User"
                className="object-cover object-top w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Notification Icon */}
            <button className="p-2 rounded-full bg-[#DCE6FF] h-10 w-10 flex items-center justify-center">
              <i className="ri-notification-2-line text-[20px] text-[#9091FF]"></i>
            </button>

            {/* ✅ Profile Popup */}
            {showPopup && (
              <div className="fixed top-16 right-5 w-80 bg-white shadow-xl rounded-2xl p-5 transition-all duration-200 ease-in-out z-50">
                {/* Close Button */}
                <button
                  className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPopup(false)}
                >
                  <i className="ri-close-line text-lg"></i>
                </button>

                {/* Profile Section - Left Image & Right Details */}
                <div className="flex items-center gap-4">
                  {/* Profile Image */}
                  <img
                    img src={user.image || "https://static.thenounproject.com/png/642902-200.png"}
                    alt="User"
                    className="w-20 h-20 rounded-full object-cover object-top"
                  />

                  {/* User Details */}
                  <div>
                    <h2 className="font-semibold text-lg">{user.name}</h2>
                    <p className="text-sm mt-1 font-semibold">{user.email}</p>

                    {/* Social Media Links */}
                    <div className="flex flex-col mt-2 text-gray-600 text-sm">
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
                <div className="flex justify-between items-center mt-4 border-t pt-3 text-sm">
                  <Link to="/profilepage">
                    <button className="text-blue-600 font-medium cursor-pointer">
                      View Profile
                    </button>
                  </Link>
                  <button className="text-red-500 font-medium cursor-pointer" onClick={handleLogout}>
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
    </nav >
  );
};

export default Navbar;
