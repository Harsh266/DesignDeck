import React, { useState, useRef, useEffect } from "react";
import { RiNotification4Fill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="w-full bg-gray-100 py-3 px-8 flex justify-between items-center shadow-md">
            <Link to="/dashboard"><h1 className="text-2xl font-semibold">DesignDeck</h1></Link>

            <div className="flex items-center bg-gray-300 px-4 py-2 rounded-full w-2/4">
                <IoSearch  className="text-gray-600 mr-2" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent focus:outline-none w-full placeholder-gray-500"
                />
            </div>

            <div className="flex items-center space-x-6 relative">
                <RiNotification4Fill className="h-6 w-6 text-black cursor-pointer" />

                <div ref={dropdownRef} className="relative">
                    <img
                        src="https://img.freepik.com/premium-vector/businessman-avatar-profile-picture-silhouette-vector-illustration_1276914-125.jpg"
                        alt="User Profile"
                        className="h-12 w-12 rounded-full border border-gray-300 cursor-pointer"
                        onClick={toggleDropdown}
                    />

                    {isOpen && (
                        <div className="absolute right-0 mt-6 w-64 bg-white shadow-lg rounded-lg p-4 z-50 transition-all duration-300 animate-fadeIn">
                            <div className="flex flex-col items-center">
                                <img
                                    src="https://img.freepik.com/premium-vector/businessman-avatar-profile-picture-silhouette-vector-illustration_1276914-125.jpg"
                                    alt="Profile"
                                    className="h-16 w-16 rounded-full border mb-2"
                                />
                                <h2 className="text-lg font-semibold">John Doe</h2>
                                <p className="text-gray-500 text-sm">johndoe123@gmail.com</p>
                            </div>
                            <hr className="my-3" />
                            <ul className="text-sm space-y-3">
                                <Link to="/profilepage"><li className="cursor-pointer hover:bg-gray-100 p-2 rounded">
                                    DesignDeck Profile
                                </li></Link>
                                <li className="cursor-pointer hover:bg-gray-100 p-2 rounded">
                                    Settings
                                </li>
                                <hr />
                                <Link to="/logout"><li className="cursor-pointer hover:bg-gray-100 p-2 rounded text-red-500 font-semibold">
                                    Sign out
                                </li></Link>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
