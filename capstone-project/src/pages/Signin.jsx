import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden h-screen w-full flex font-poppins">
            <div className="w-[50%] p-8">
                <div>
                    <h1 className="text-2xl font-bold ">DesignDeck</h1>
                </div>
                <div className="pl-10 pt-3">
                    <h2 className="text-3xl font-semibold mt-4">Login to your Account</h2>
                    <p className="text-gray-600  text-sm mt-4">
                    Welcome Back to 
                        <span className="font-bold"> DesignDeck </span> <br /> Sign in to Showcase, Inspire, and Elevate Your Creativity!
                    </p>
                    <form className="mt-8">
                        <label className="block text-sm font-semibold mt-4 mb-4">E-Mail</label>
                        <input
                            type="email"
                            placeholder="xyz@abc.com"
                            className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F2F2]"
                        />

                        <label className="block text-sm font-semibold mt-4 mb-4">Password</label>
                        <input
                            type="password"
                            placeholder="********************"
                            className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F2F2]"
                        />
                        <div className="mt-2 flex items-center justify-end">
                            <label htmlFor="terms" className="text-[12px] text-black-600">
                                <a href="#" className="text-black-800 font-semibold underline"> Forgot Password? </a> 
                            </label>
                        </div>
                        <div className="mt-8 flex space-x-4">
                            <button type="submit" className="bg-black text-white py-3 px-6 rounded-full flex items-center font-medium hover:cursor-pointer gap-2">
                            <span>Next Step</span> <FaArrowRightLong />
                            </button>
                            <button className="border py-3 px-6 rounded-full flex items-center gap-2 font-medium hover:cursor-pointer">
                                <FcGoogle className="text-[20px]"/>
                                <span>Continue with Google</span>
                            </button>
                        </div>
                    </form>
                    <p className="text-black-800 text-medium mt-6 gap-1 flex">
                    Do not have an account? 
                        <a href="#" className="text-black-600 font-semibold underline">Sign Up </a>
                    </p>
                </div>
            </div>
            <div className="w-[25%]">

            </div>
            <div className="w-[45%] p-[30px]">
                <img
                    src="https://c1.wallpaperflare.com/preview/730/789/292/developer-programming-work-minimal.jpg"
                    className="w-[100%] h-full object-cover border rounded-[10px] mx-[-10px]"
                    alt="Signup"
                />
            </div>
        </div>
    );
};

export default Signin;
