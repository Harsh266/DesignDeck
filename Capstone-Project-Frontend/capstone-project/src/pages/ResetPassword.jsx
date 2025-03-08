import React from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    return (
        <>
            <div className="flex items-center justify-between min-h-screen bg-white p-6 h-screen">
                {/* Left Section */}
                <div className="w-1/2 h-full p-10 flex flex-col justify-center items-center bg-white">
                    {/* Logo at top left */}
                    <h1 className="text-xl font-semibold absolute top-20 left-12">DesignDeck</h1>

                    {/* Form Container */}
                    <div className="w-full max-w-md px-15">
                        {/* Email Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="h-12 w-12 flex items-center justify-center rounded-[12px] bg-white border border-[#D9D9D9]">
                                <i className="ri-mail-open-line text-2xl"></i>
                            </div>
                        </div>

                        {/* Title & Description */}
                        <h2 className="text-3xl font-semibold text-center">Forgot Password?</h2>
                        <p className="text-gray-500 text-center mt-2 text-sm">
                            No worries, we’ll send you reset instruction.
                        </p>

                        {/* Input & Button */}
                        <form className="flex flex-col gap-4 mt-6">
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="border border-gray-300 p-3 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <Link to="/changepassword"><button type="submit" className="bg-[#376CFF] text-white p-3 rounded w-full rounded-[5px] cursor-pointer">
                                Sent Link
                            </button></Link>
                        </form>

                        {/* Back to login */}
                        <a href="/signin" className="mt-4 text-gray-600 flex items-center justify-center">
                            ← Back to login
                        </a>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-1/2 h-screen flex items-center justify-end p-8">
                    <img
                        src="/sentlink.jpg"
                        alt="Sent link"
                        className="w-[85%] h-[100%] rounded-lg"
                    />
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
