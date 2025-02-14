import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Signin = () => {
    return (
        <div className="rounded-lg w-full font-poppins">
            <div className="w-[50%] h-screen float-left flex items-center justify-center ">
                <div className="h-[90%] w-[90%] flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl font-bold ">DesignDeck</h1>
                    </div>
                    <div className="pr-12  pt-2 pl-8">
                        <h2 className="text-3xl font-semibold pt-4">Login to your Account</h2>
                        <p className="text-gray-600 text-sm pt-2">
                            Welcome Back to
                            <span className="font-bold"> DesignDeck </span> <br /> Sign in to Showcase, Inspire, and Elevate Your Creativity!
                        </p>
                        <form className="pt-8">
                            <label className="block text-sm font-semibold pt-2">E-Mail</label>
                            <input
                                type="email"
                                placeholder="xyz@abc.com"
                                className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F2F2] mt-4"
                            />

                            <label className="block text-sm font-semibold pt-4">Password</label>
                            <input
                                type="password"
                                placeholder="********************"
                                className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F2F2] mt-4"
                            />
                            <div className="pt-4 flex items-center justify-end">
                                <label htmlFor="terms" className="text-[12px] text-black-600">
                                    <a href="#" className="text-black-800 font-semibold underline"> Forgot Password? </a>
                                </label>
                            </div>
                            <div className="flex space-x-4 pt-5">
                            <Link to="/dashboard"> <button type="submit"  className="bg-black text-white py-3 px-6 rounded-full flex items-center font-medium hover:cursor-pointer gap-2">
                                    <span>Next Step</span> <FaArrowRightLong />
                                </button></Link>
                                <button className="border py-3 px-6 rounded-full flex items-center gap-2 font-medium hover:cursor-pointer">
                                    <FcGoogle className="text-[20px]" />
                                    <span>Continue with Google</span>
                                </button>
                            </div>
                        </form>
                        <p className="text-black-800 text-medium flex gap-1 pt-6">
                            Do not have an account?
                            <Link to="/signup"className="text-black-600 font-semibold underline">Sign up </Link>
                        </p>
                    </div>
                </div>

            </div>
            <div className="w-[50%] h-screen float-right flex items-center justify-center ">
                <div className="h-[90%] w-[80%] flex items-center justify-end">
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

export default Signin;
