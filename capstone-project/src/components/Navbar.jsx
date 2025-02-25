import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <nav className="flex w-full justify-between items-center px-6 py-3 fixed top-0 left-0 bg-[#ffffffc3] backdrop-blur-md z-50">
      {/* Logo */}
      <Link to="/dashboard">
        <h1 className="text-lg font-semibold">Design Deck</h1>
      </Link>

      {/* User Profile & Notification */}
      <div className="flex items-center gap-4 relative">
        {/* User Info */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setShowPopup(!showPopup)}
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User"
            className="object-cover object-top w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">UserName</p>
            <p className="text-xs text-gray-500">useremail@xyz.com</p>
          </div>
        </div>

        {/* Notification Icon */}
        <button className="p-2 rounded-full bg-[#DCE6FF] h-10 w-10 flex items-center justify-center">
          <i className="ri-notification-2-line text-[20px] text-[#9091FF]"></i>
        </button>
      </div>

      {/* Profile Popup */}
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
              src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User"
              className="w-20 h-20 rounded-full object-cover object-top"
            />

            {/* User Details */}
            <div>
              <h2 className="font-semibold text-lg">UserName</h2>
              <p className="text-sm mt-1 font-semibold">usermail@gmail.com</p>

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
            <Link to="/logout">
              <button className="text-red-500 font-medium cursor-pointer">
                Logout
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
