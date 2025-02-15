import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


const Uploadprojectpage = () => {
    const [activeForm, setActiveForm] = useState("separate");

    return (
        <>
        <Navbar />
            <div className="min-h-screen  bg-gray-100 flex flex-col items-center p-6">
            
                <div className="w-[90%] bg-white shadow-lg p-4 flex justify-between rounded-lg">
                    <button
                        onClick={() => setActiveForm("separate")}
                        className={`flex-1 text-center p-3 font-medium transition ${activeForm === "separate" ? "bg-[black] text-white" : "bg-gray-200  hover:cursor-pointer"
                            } rounded-lg mx-2`}
                    >
                        Upload Separate Files
                    </button>

                    <button
                        onClick={() => setActiveForm("all")}
                        className={`flex-1 text-center p-3 font-medium transition ${activeForm === "all" ? "bg-[black] text-white" : "bg-gray-200  hover:cursor-pointer"
                            } rounded-lg mx-2`}
                    >
                        Upload All Files
                    </button>

                    <button
                        onClick={() => setActiveForm("media")}
                        className={`flex-1 text-center p-3 font-medium transition ${activeForm === "media" ? "bg-[black] text-white" : "bg-gray-200  hover:cursor-pointer"
                            } rounded-lg mx-2`}
                    >
                        Upload Images & Videos
                    </button>
                </div>

                <div className="w-[90%] mt-6 bg-white p-6 rounded-lg shadow-lg ">
                    {activeForm === "separate" && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Upload Code Files</h3>

                            <label className="block font-medium mb-2">Project Name</label>
                            <input type="text" className="w-full p-2 border rounded-lg mb-4" placeholder="Enter project name" />

                            <label className="block font-medium mb-2">Project Description</label>
                            <textarea className="w-full p-2 border rounded-lg mb-4" rows="4" placeholder="Enter project details"></textarea>

                            <label className="block font-medium mb-2">HTML File</label>
                            <input type="file" accept=".html" className="w-full border p-2 rounded-lg mb-4" />

                            <label className="block font-medium mb-2">CSS File</label>
                            <input type="file" accept=".css" className="w-full border p-2 rounded-lg mb-4" />

                            <label className="block font-
                            medium mb-2">JavaScript File</label>
                            <input type="file" accept=".js" className="w-full border p-2 rounded-lg mb-4" />

                            <button className="w-full bg-[black] text-white py-3 rounded-lg hover:cursor-pointer hover:scale-102 transition font-regular">Upload Files</button>
                        </div>
                    )}

                    {activeForm === "all" && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Upload All Files Together</h3>

                            <label className="block font-medium mb-2">Project Name</label>
                            <input type="text" className="w-full p-2 border rounded-lg mb-4" placeholder="Enter project name" />

                            <label className="block font-medium mb-2">Project Description</label>
                            <textarea className="w-full p-2 border rounded-lg mb-4" rows="4" placeholder="Enter project details"></textarea>

                            <label className="block font-medium mb-2">Upload One File</label>
                            <input type="file" accept=".html" className="w-full border p-2 rounded-lg mb-4" />

                            <button className="w-full bg-[black] text-white py-3 rounded-lg hover:cursor-pointer hover:scale-102 transition font-regular">Upload Files</button>
                        </div>
                    )}

                    {activeForm === "media" && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Upload Images & Videos</h3>

                            <label className="block font-medium mb-2">Project Name</label>
                            <input type="text" className="w-full p-2 border rounded-lg mb-4" placeholder="Enter project name" />

                            <label className="block font-medium mb-2">Project Description</label>
                            <textarea className="w-full p-2 border rounded-lg mb-4" rows="4" placeholder="Enter project details"></textarea>

                            <label className="block font-medium mb-2">Upload Images</label>
                            <input type="file" accept="image/*" multiple className="w-full border p-2 rounded-lg mb-4" />

                            <label className="block font-medium mt-2 mb-2">Upload Images </label>
                            <input type="file" accept="video/*" multiple className="w-full border p-2 rounded-lg mb-4" />

                            <button className="w-full bg-[black] text-white py-3 rounded-lg hover:cursor-pointer hover:scale-102 transition font-regular">Upload Images & Videos</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Uploadprojectpage;
