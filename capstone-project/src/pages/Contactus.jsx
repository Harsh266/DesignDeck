import React from "react";

const Contactus = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 px-2">
            <div className="bg-white shadow-lg rounded-lg p-6  w-[40%] h-[95%] flex flex-col justify-between">
                <h3 className="text-gray-500 text-sm font-medium">Get in Touch</h3>
                <h1 className="text-2xl font-bold leading-tight pt-2">
                    Connect, Collaborate, Create <br /> We're Here to Help!
                </h1>
                <p className="text-gray-600 text-sm pt-2">
                    Have a Question? <br /> We're here to help! Feel free to reach out anytime.
                </p>
                <form className="space-y-2 pt-4">
                    <div>
                        <label className="block text-sm font-semibold pb-2">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[white]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold py-2">E-mail</label>
                        <input
                            type="email"
                            placeholder="johndoe@example.com"
                            className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[white]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold py-2">Message</label>
                        <textarea
                            rows="3"
                            placeholder="Hello, I’d love to learn more about your platform. Looking forward to your response!"
                            className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[white]"
                        ></textarea>
                    </div>
                    <button className="w-full bg-[black] text-white py-3 rounded-lg text-center text-lg font-medium hover:scale-105 transition hover:cursor-pointer">
                        Submit Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contactus;
