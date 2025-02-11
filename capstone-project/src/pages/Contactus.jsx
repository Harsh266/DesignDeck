import React from "react";

const Contactus = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 px-2">
            <div className="bg-white shadow-lg rounded-lg p-6  w-[35%] h-[90%]">
                {/* Heading */}
                <h3 className="text-gray-500 text-sm font-medium">Get in Touch</h3>
                <h1 className="text-2xl font-bold mt-2 leading-tight">
                    Connect, Collaborate, Create <br /> We're Here to Help!
                </h1>
                <p className="text-gray-600 mt-2 text-sm">
                    Have a Question? <br /> We're here to help! Feel free to reach out anytime.
                </p>

                <hr className="my-4" />

                {/* Form */}
                <form className="space-y-2">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">E-mail</label>
                        <input
                            type="email"
                            placeholder="johndoe@example.com"
                            className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 ">Message</label>
                        <textarea
                            rows="2"
                            placeholder="Hello, I’d love to learn more about your platform. Looking forward to your response!"
                            className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-center text-lg font-medium hover:bg-blue-700 transition hover:cursor-pointer">
                        Submit Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contactus;
