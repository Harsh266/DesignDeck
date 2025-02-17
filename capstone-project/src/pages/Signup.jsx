import React, { useState } from "react";
import { FaArrowRightLong, FaPlus } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const avatars = [
  "https://i.pravatar.cc/100?img=1",
  "https://i.pravatar.cc/100?img=2",
  "https://i.pravatar.cc/100?img=3",
  "https://i.pravatar.cc/100?img=4",
  "https://i.pravatar.cc/100?img=5",
  "https://i.pravatar.cc/100?img=6",
  "https://i.pravatar.cc/100?img=7",
];

const Signup = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen font-poppins">
      <h1 className="text-lg font-bold absolute mt-8 ml-15">DesignDeck</h1>
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-16 py-8">
        <div className="w-full max-w-lg">
          <h2 className="text-2xl font-semibold pt-4">Create Your Account</h2>
          <p className="text-gray-600 text-sm pt-2">
            Let’s create an account & showcase your creativity with
            <span className="font-bold"> DesignDeck </span> – Where ideas turn
            into stunning designs!
          </p>

          {/* Avatar Selection */}
          <div className="pt-4">
            <label className="block text-sm font-semibold pb-2">
              Choose Your Avatar
            </label>
            <div className="flex items-center space-x-2">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className={`w-10 h-10 rounded-full cursor-pointer transition ${
                    selectedAvatar === avatar
                      ? "border-2 border-blue-500"
                      : "border border-gray-300"
                  }`}
                  onClick={() => setSelectedAvatar(avatar)}
                />
              ))}
              <label className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-400 cursor-pointer bg-gray-200 hover:bg-gray-300 transition">
                <FaPlus className="text-gray-600" />
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>

          {/* Signup Form */}
          <form className="pt-4">
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              placeholder="Bruce Wayne"
              className="w-full border rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F2F2] mt-2"
            />

            <label className="block text-sm font-semibold pt-2">E-Mail</label>
            <input
              type="email"
              placeholder="xyz@abc.com"
              className="w-full border rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F2F2] mt-2"
            />

            <label className="block text-sm font-semibold pt-2">Password</label>
            <input
              type="password"
              placeholder="••••••••••••••••••"
              className="w-full border rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F2F2] mt-2"
            />

            <div className="flex items-center pt-4">
              <input type="checkbox" id="terms" className="" />
              <label
                htmlFor="terms"
                className="text-sm text-black-600 flex gap-1 pl-2"
              >
                I agree to all
                <a href="#" className="text-black-800 font-semibold underline">
                  Terms & Conditions
                </a>
                of{" "}
                <span className="text-black-800 font-semibold">DesignDeck</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col lg:flex-row lg:space-x-4 pt-4">
              <Link to="/signin">
                <button
                  type="submit"
                  className="bg-black text-white py-3 px-6 rounded-full flex items-center font-medium hover:cursor-pointer gap-2 w-full lg:w-auto justify-center"
                >
                  <span>Next Step</span> <FaArrowRightLong />
                </button>
              </Link>
              <button className="border py-3 px-6 rounded-full flex items-center gap-2 font-medium hover:cursor-pointer w-full lg:w-auto justify-center mt-3 lg:mt-0">
                <FcGoogle className="text-[20px]" />
                <span>Continue with Google</span>
              </button>
            </div>
          </form>

          <p className="text-black-800 text-medium flex gap-1 pt-4">
            Already have an account?
            <Link
              to="/signin"
              className="text-black-600 font-semibold underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full lg:w-1/2 items-center justify-center hidden lg:flex">
        <div className="h-[90%] w-[80%] flex items-center justify-start">
          <img
            src="https://c1.wallpaperflare.com/preview/730/789/292/developer-programming-work-minimal.jpg"
            className="object-cover border rounded-[10px] h-[100%] w-[80%]"
            alt="Signup"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
