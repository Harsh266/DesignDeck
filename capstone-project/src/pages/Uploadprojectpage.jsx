import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


const Uploadprojectpage = () => {

    const [showImagePopup, setShowImagePopup] = useState(false);
    const [selectedImageFiles, setSelectedImageFiles] = useState([]);
    const [showVideoPopup, setShowVideoPopup] = useState(false);
    const [selectedVideoFiles, setSelectedVideoFiles] = useState([]);
    const [showCodePopup, setShowCodePopup] = useState(false);
    const [selectedCodeFiles, setSelectedCodeFiles] = useState([]);

    const handleImageFileChange = (event) => {
        const files = Array.from(event.target.files);

        const validFiles = files.filter(file =>
            file.type === "image/jpeg" || file.type === "image/png"
        );

        if (validFiles.length !== files.length) {
            alert("Only JPG and PNG files are allowed.");
        }

        setSelectedImageFiles(prevFiles => [...prevFiles, ...validFiles]);
    };

    const handleVideoFileChange = (event) => {
        const files = Array.from(event.target.files);
        const validTypes = ["video/mp4", "video/mov", "video/avi"];
        const validFiles = files.filter(file => validTypes.includes(file.type));

        if (validFiles.length !== files.length) {
            alert("Only .mp4, .mov, and .avi files are allowed.");
        }

        setSelectedVideoFiles(prevFiles => [...prevFiles, ...validFiles]);
    };

    const handleCodeFileChange = (event) => {
        const files = Array.from(event.target.files);
        const validTypes = ["text/html", "text/css", "application/javascript"];
        const validFiles = files.filter(file => validTypes.includes(file.type));

        if (validFiles.length !== files.length) {
            alert("Only .html, .css, and .js files are allowed.");
        }

        setSelectedCodeFiles(prevFiles => [...prevFiles, ...validFiles]);
    };

    const handleDeleteImageFile = (index) => {
        setSelectedImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleDeleteVideoFile = (index) => {
        setSelectedVideoFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleDeleteCodeFile = (index) => {
        setSelectedCodeFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <>
            <Helmet>
                <title>DesignDeck - Upload Page</title>
            </Helmet>
            <Navbar />
            <div className="min-h-fit bg-white flex flex-col px-6 md:px-20 w-full mt-12">
                {/* Upload Section */}
                <div className="mt-10 text-left">
                    <h2 className="text-2xl font-semibold">Upload your Project</h2>
                    <p className="text-gray-500 mt-2 max-w-lg font-regular text-[13px]">
                        Seamlessly upload your project files with ease choose your preferred method and get started in just a few clicks.
                    </p>
                </div>

                {/* Upload Options */}
                <div className="mt-20 text-center">
                    <h3 className="text-lg font-medium">Choose your upload type</h3>
                    <p className="text-gray-500 text-sm font-regular mt-2">Easily upload your files by selecting the method that best suits your needs</p>
                </div>

                <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-50">
                    {/* Image Upload */}
                    <div className="flex flex-col items-center cursor-pointer" onClick={() => setShowImagePopup(true)}>
                        <div className="bg-[#FDE8CB] w-20 h-20 flex justify-center items-center rounded-full">
                            <i className="ri-gallery-line text-[#ED9E29] text-3xl"></i>
                        </div>
                        <p className="mt-2 font-medium">Image</p>
                    </div>

                    {/* Embedded Code Upload */}
                    <div className="flex flex-col items-center cursor-pointer" onClick={() => setShowCodePopup(true)}>
                        <div className="bg-[#DCE6FF] w-20 h-20 flex justify-center items-center rounded-full">
                            <i className="ri-code-s-slash-line text-[#376CFF] text-3xl"></i>
                        </div>
                        <p className="mt-2 font-medium">Embedded Code</p>
                    </div>

                    {/* Video Upload */}
                    <div className="flex flex-col items-center cursor-pointer" onClick={() => setShowVideoPopup(true)}>
                        <div className="bg-[#F4D9FF] w-20 h-20 flex justify-center items-center rounded-full">
                            <i className="ri-video-line text-[#C684E0] text-3xl"></i>
                        </div>
                        <p className="mt-2 font-medium">Video</p>
                    </div>
                </div>

                {/* Popup Modal */}
                {showImagePopup && (
                    <div className="fixed h-screen w-screen inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative flex flex-col justify-center">

                            {/* Close Button */}
                            <button className="absolute top-4 right-4 text-gray-600" onClick={() => setShowImagePopup(false)}>
                                <i className="ri-close-line text-[20px] cursor-pointer"></i>
                            </button>

                            {/* Title */}
                            <h2 className="text-[20px] flex items-center gap-2">
                                <i className="ri-file-upload-line"></i>
                                <p className="font-semibold">Upload Images</p>
                            </h2>
                            <p className="text-gray-500 text-[12px]">Add your images here</p>

                            {/* Upload Box */}
                            <label htmlFor="fileInput" className="mt-4 border border-2 border-[#ED9E29] bg-[#FDE8CB] p-6 text-center rounded-lg cursor-pointer h-[25%] flex flex-col justify-center">
                                <i className="ri-file-image-line text-[#ED9E29] text-[22px]"></i>
                                <p className="text-[#ED9E29] font-medium mt-1">Choose Files</p>
                                <input type="file" id="fileInput" accept=".jpg,.png" className="hidden" onChange={handleImageFileChange} multiple />
                            </label>
                            <p className="text-gray-400 text-xs mt-1">Only .jpg and .png files. 50 MB max file size.</p>

                            {/* Project Name */}
                            <div className="mt-4">
                                <label className="block font-medium text-[16px]">Project Name</label>
                                <input type="text" placeholder="Enter your project name" className="w-full p-2 border border-[#B7B7B7] rounded mt-1 outline-none" />
                            </div>

                            {/* Project Description */}
                            <div className="mt-3">
                                <label className="block font-medium text-[16px]">Project Description</label>
                                <input type="text" placeholder="Enter your project description" className="w-full p-2 border border-[#B7B7B7] rounded mt-1 outline-none" />
                            </div>

                            {/* Upload Files Section */}
                            <div className={`mt-3 flex-grow rounded-lg ${selectedImageFiles.length > 1 ? "max-h-25 overflow-y-auto" : ""}`}>
                                <label className="block font-medium text-[16px] underline">Uploaded Files</label>

                                {selectedImageFiles.length === 0 ? (
                                    <p className="text-gray-500 text-sm mt-2">No files selected</p>
                                ) : (
                                    selectedImageFiles.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between border border-[#B7B7B7] p-2 rounded mt-2">
                                            <div className="flex items-center gap-2">
                                                <i className="ri-image-2-line text-[22px] text-[#9E9E9E]"></i>
                                                <div>
                                                    <p className="text-sm font-medium">{file.name}</p>
                                                    <p className="text-gray-400 text-[10px]">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDeleteImageFile(index)}>
                                                <i className="ri-delete-bin-6-line text-[18px] text-[#9E9E9E] cursor-pointer"></i>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="mt-3 flex justify-end gap-4">
                                <button className="border border-[#ED9E29] px-4 py-2 rounded-lg text-[#ED9E29] cursor-pointer" onClick={() => setImageShowPopup(false)}>Cancel</button>
                                <button className="bg-[#ED9E29] text-white px-4 py-2 rounded-lg cursor-pointer" disabled={selectedImageFiles.length === 0}>
                                    <Link to="/profilepage">Upload</Link>
                                </button>
                            </div>

                        </div>
                    </div>
                )}
                {showCodePopup && (
                    <div className="fixed h-screen w-screen inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative flex flex-col justify-center">

                            {/* Close Button */}
                            <button className="absolute top-4 right-4 text-gray-600" onClick={() => setShowCodePopup(false)}>
                                <i className="ri-close-line text-[20px] cursor-pointer"></i>
                            </button>

                            {/* Title */}
                            <h2 className="text-[20px] flex items-center gap-2">
                                <i className="ri-file-upload-line"></i>
                                <p className="font-semibold">Upload Code Files</p>
                            </h2>
                            <p className="text-gray-500 text-[12px]">Add your HTML, CSS, and JS files here</p>

                            {/* Upload Box */}
                            <label htmlFor="codeFileInput" className="mt-3 border border-[#376CFF] bg-[#DCE6FF] p-6 text-center rounded-lg cursor-pointer h-[25%] flex flex-col justify-center">
                                <i className="ri-file-code-line text-[#376CFF] text-[22px]"></i>
                                <p className="text-[#376CFF] font-medium mt-1">Choose Files</p>
                                <input type="file" id="codeFileInput" accept=".html,.css,.js" className="hidden" onChange={handleCodeFileChange} multiple />
                            </label>
                            <p className="text-gray-400 text-xs mt-1">Only .html, .css, and .js files. 50 MB max file size.</p>

                            {/* Project Name */}
                            <div className="mt-4">
                                <label className="block font-medium text-[16px]">Project Name</label>
                                <input type="text" placeholder="Enter your project name" className="w-full p-2 border border-[#B7B7B7] rounded mt-1 outline-none" />
                            </div>

                            {/* Project Description */}
                            <div className="mt-3">
                                <label className="block font-medium text-[16px]">Project Description</label>
                                <input type="text" placeholder="Enter your project description" className="w-full p-2 border border-[#B7B7B7] rounded mt-1 outline-none" />
                            </div>

                            {/* Upload Files Section */}
                            <div className={`mt-3 flex-grow rounded-lg ${selectedCodeFiles.length > 1 ? "max-h-25 overflow-y-auto" : ""}`}>
                                <label className="block font-medium text-[16px] underline">Uploaded Code Files</label>

                                {selectedCodeFiles.length === 0 ? (
                                    <p className="text-gray-500 text-sm mt-2">No files selected</p>
                                ) : (
                                    selectedCodeFiles.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between border border-[#B7B7B7] p-2 rounded mt-2">
                                            <div className="flex items-center gap-2">
                                                <i className="ri-file-zip-line text-[22px] text-[#9E9E9E]"></i>
                                                <div>
                                                    <p className="text-sm font-medium">{file.name}</p>
                                                    <p className="text-gray-400 text-[10px]">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDeleteCodeFile(index)}>
                                                <i className="ri-delete-bin-6-line text-[18px] text-[#9E9E9E] cursor-pointer"></i>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="mt-3 flex justify-end gap-4">
                                <button className="border border-[#376CFF] px-4 py-2 rounded-lg text-[#376CFF] cursor-pointer" onClick={() => setShowCodePopup(false)}>Cancel</button>
                                <button className="bg-[#376CFF] text-white px-4 py-2 rounded-lg cursor-pointer" disabled={selectedCodeFiles.length === 0}>
                                    <Link to="/profilepage">Upload</Link>
                                </button>
                            </div>

                        </div>
                    </div>
                )}
                {showVideoPopup && (
                    <div className="fixed h-screen w-screen inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative flex flex-col justify-center">

                            {/* Close Button */}
                            <button className="absolute top-4 right-4 text-gray-600" onClick={() => setShowVideoPopup(false)}>
                                <i className="ri-close-line text-[20px] cursor-pointer"></i>
                            </button>

                            {/* Title */}
                            <h2 className="text-[20px] flex items-center gap-2">
                                <i className="ri-file-upload-line "></i>
                                <p className="font-semibold">Upload Videos</p>
                            </h2>
                            <p className="text-gray-500 text-[12px] ">Add your videos here</p>

                            {/* Upload Box */}
                            <label htmlFor="videoFileInput" className="mt-4 border border-2 border-[#C684E0] bg-[#F4D9FF] p-6 text-center rounded-lg cursor-pointer h-[25%] flex flex-col justify-center">
                                <i className="ri-file-video-line text-[#C684E0] text-[22px]"></i>
                                <p className="text-[#C684E0] font-medium mt-1">Choose Videos</p>
                                <input type="file" id="videoFileInput" accept=".mp4,.mov,.avi" className="hidden" onChange={handleVideoFileChange} multiple />
                            </label>
                            <p className="text-gray-400 text-xs mt-1">Only .mp4, .mov, and .avi files. 50 MB max file size.</p>

                            {/* Project Name */}
                            <div className="mt-4">
                                <label className="block font-medium text-[16px]">Project Name</label>
                                <input type="text" placeholder="Enter your project name" className="w-full p-2 border border-[#B7B7B7] rounded mt-1 outline-none" />
                            </div>

                            {/* Project Description */}
                            <div className="mt-3">
                                <label className="block font-medium text-[16px]">Project Description</label>
                                <input type="text" placeholder="Enter your project description" className="w-full p-2 border border-[#B7B7B7] rounded mt-1 outline-none" />
                            </div>

                            {/* Upload Files Section */}
                            <div className={`mt-3 flex-grow rounded-lg ${selectedVideoFiles.length > 1 ? "max-h-25 overflow-y-auto" : ""}`}>
                                <label className="block font-medium text-[16px] underline">Uploaded Videos</label>

                                {selectedVideoFiles.length === 0 ? (
                                    <p className="text-gray-500 text-sm mt-2">No files selected</p>
                                ) : (
                                    selectedVideoFiles.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between border border-[#B7B7B7] p-2 rounded mt-2">
                                            <div className="flex items-center gap-2">
                                                <i className="ri-video-line text-[22px] text-[#9E9E9E]"></i>
                                                <div>
                                                    <p className="text-sm font-medium">{file.name}</p>
                                                    <p className="text-gray-400 text-[10px]">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDeleteVideoFile(index)}>
                                                <i className="ri-delete-bin-6-line text-[18px] text-[#9E9E9E] cursor-pointer"></i>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="mt-3 flex justify-end gap-4">
                                <button className="border border-[#C684E0] px-4 py-2 rounded-lg text-[#C684E0] cursor-pointer" onClick={() => setShowVideoPopup(false)}>Cancel</button>
                                <button className="bg-[#C684E0] text-white px-4 py-2 rounded-lg cursor-pointer" disabled={selectedVideoFiles.length === 0}>
                                    <Link to="/profilepage">Upload</Link>
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Uploadprojectpage;
