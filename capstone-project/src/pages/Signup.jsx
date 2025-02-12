import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
    return (
        <div className="rounded-lg w-full font-poppins">
            <div className="w-[50%] h-screen float-left flex items-center justify-center ">
                <div className="h-[90%] w-[90%] flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl font-bold ">DesignDeck</h1>
                    </div>
                    <div className="pr-12  pt-2 pl-8">
                        <h2 className="text-3xl font-semibold pt-4">Create Your Account</h2>
                        <p className="text-gray-600 text-sm pt-2">
                            Let’s create an account & showcase your creativity with
                            <span className="font-bold"> DesignDeck </span> – Where ideas turn into stunning designs!
                        </p>
                        <form className="pt-4">
                            <label className="block text-sm font-semibold">Name</label>
                            <input
                                type="text"
                                placeholder="Bruce Wayne"
                                className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F2F2] mt-2"
                            />

                            <label className="block text-sm font-semibold pt-2">E-Mail</label>
                            <input
                                type="email"
                                placeholder="xyz@abc.com"
                                className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F2F2] mt-2"
                            />

                            <label className="block text-sm font-semibold pt-2">Password</label>
                            <input
                                type="password"
                                placeholder="********************"
                                className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F2F2] mt-2"
                            />
                            <div className="flex items-center pt-4">
                                <input type="checkbox" id="terms" className="" />
                                <label htmlFor="terms" className="text-sm text-black-600 flex gap-1 pl-2">
                                    I agree to all
                                    <a href="#" className="text-black-800 font-semibold underline">Terms & Conditions</a> of <span className="text-black-800 font-semibold">DesignDeck</span>.
                                </label>
                            </div>
                            <div className="flex space-x-4 pt-4">
                                <button type="submit" className="bg-black text-white py-3 px-6 rounded-full flex items-center font-medium hover:cursor-pointer gap-2">
                                    <span>Next Step</span> <FaArrowRightLong />
                                </button>
                                <button className="border py-3 px-6 rounded-full flex items-center gap-2 font-medium hover:cursor-pointer">
                                    <FcGoogle className="text-[20px]" />
                                    <span>Continue with Google</span>
                                </button>
                            </div>
                        </form>
                        <p className="text-black-800 text-medium flex gap-1 pt-4">
                            Already have an account?
                            <a href="#" className="text-black-600 font-semibold underline">Sign in </a>
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

export default Signup;
