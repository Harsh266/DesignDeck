import { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../context/ThemeContext";

const UploadProjectPage = () => {
    const { theme } = useContext(ThemeContext);

    const [popupType, setPopupType] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);
    const [videoFiles, setVideoFiles] = useState([]);
    const [codeFiles, setCodeFiles] = useState([]);
    const [tempFiles, setTempFiles] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [globalTitle, setGlobalTitle] = useState("");
    const [globalDescription, setGlobalDescription] = useState("");
    const [message, setMessage] = useState(null);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const formattedFiles = files.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file),
            file: file
        }));
        setTempFiles(prev => [...prev, ...formattedFiles]);
    };

    const handleUploadFiles = () => {
        if (tempFiles.length === 0) {
            setMessage({ text: "Please select files before uploading.", type: "error" });
            return;
        }

        if (!title || !description) {
            setMessage({ text: "Please enter a title and description.", type: "error" });
            return;
        }

        if (!globalTitle && !globalDescription) {
            setGlobalTitle(title);
            setGlobalDescription(description);
        } else if (globalTitle !== title || globalDescription !== description) {
            setMessage({ text: "Title and description must be the same for all uploads.", type: "error" });
            return;
        }

        if (popupType === "image") {
            setImageFiles(prev => [...prev, ...tempFiles]);
        } else if (popupType === "video") {
            setVideoFiles(prev => [...prev, ...tempFiles]);
        } else if (popupType === "code") {
            setCodeFiles(prev => [...prev, ...tempFiles]);
        }

        setMessage({ text: "Files uploaded successfully!", type: "success" });

        setTempFiles([]);
        setTitle("");
        setDescription("");
        setPopupType(null);
    };

    const handleDeleteTempFile = (index) => {
        setTempFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleDeleteFile = (type, index) => {
        if (type === "image") {
            setImageFiles(prev => prev.filter((_, i) => i !== index));
        } else if (type === "video") {
            setVideoFiles(prev => prev.filter((_, i) => i !== index));
        } else if (type === "code") {
            setCodeFiles(prev => prev.filter((_, i) => i !== index));
        }
    };

    // Auto-hide message after 3 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleUpload = () => {
        // Clear files and project details after upload
        setImageFiles([]);
        setVideoFiles([]);
        setCodeFiles([]);
        setGlobalTitle("");
        setGlobalDescription("");
        setPopup(null);
    };

    const handleCancel = () => {
        // Clear files and project details when canceling
        setImageFiles([]);
        setVideoFiles([]);
        setCodeFiles([]);
        setGlobalTitle("");
        setGlobalDescription("");
        setPopup(null);
    };

    return (
        <>
            <Helmet>
                <title>DesignDeck - Upload Page</title>
            </Helmet>
            <Navbar />

            <div className={`${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} min-h-screen flex flex-col px-10 md:px-20 w-full pt-20`}>

                {/* Upload Section */}
                <div className="mt-10 text-left">
                    <h2 className="text-2xl font-semibold">Upload your Project</h2>
                    <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} mt-2 max-w-lg font-regular text-[13px]`}>
                        Seamlessly upload your project files with ease. Choose your preferred method and get started in just a few clicks.
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center pt-10 gap-10">
                    <div className="text-center">
                        <h3 className="text-lg font-medium">Choose your upload type</h3>
                        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-sm font-regular mt-2`}>
                            Easily upload your files by selecting the method that best suits your needs.
                        </p>
                    </div>

                    <div className="mt-0 flex flex-col md:flex-row items-center justify-center gap-50">
                        {/* Image Upload */}
                        <div className="flex flex-col items-center cursor-pointer" onClick={() => setPopupType("image")}>
                            <div className="bg-[#FDE8CB] w-20 h-20 flex justify-center items-center rounded-full">
                                <i className="ri-gallery-line text-[#ED9E29] text-3xl"></i>
                            </div>
                            <p className="mt-2 font-medium">Image</p>
                        </div>

                        {/* Embedded Code Upload */}
                        <div className="flex flex-col items-center cursor-pointer" onClick={() => setPopupType("code")}>
                            <div className="bg-[#DCE6FF] w-20 h-20 flex justify-center items-center rounded-full">
                                <i className="ri-code-s-slash-line text-[#376CFF] text-3xl"></i>
                            </div>
                            <p className="mt-2 font-medium">Embedded Code</p>
                        </div>

                        {/* Video Upload */}
                        <div className="flex flex-col items-center cursor-pointer" onClick={() => setPopupType("video")}>
                            <div className="bg-[#F4D9FF] w-20 h-20 flex justify-center items-center rounded-full">
                                <i className="ri-video-line text-[#C684E0] text-3xl"></i>
                            </div>
                            <p className="mt-2 font-medium">Video</p>
                        </div>
                    </div>
                </div>
                {/* Upload Options */}


                {message && (
                    <div className={`absolute top-20 right-4 px-4 py-2 rounded-lg text-white text-sm font-medium shadow-lg ${message.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
                        {message.text}
                    </div>
                )}
                {popupType === "image" && (
                    <ImagePopup
                        setPopup={setPopupType}
                        handleFileChange={handleFileChange}
                        handleUpload={handleUploadFiles}
                        tempFiles={tempFiles}
                        handleDeleteTempFile={handleDeleteTempFile}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        title={title}
                        description={description}
                    />
                )}

                {popupType === "code" && (
                    <CodePopup
                        setPopup={setPopupType}
                        handleFileChange={handleFileChange}
                        handleUpload={handleUploadFiles}
                        tempFiles={tempFiles}
                        handleDeleteTempFile={handleDeleteTempFile}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        title={title}
                        description={description}
                    />
                )}

                {popupType === "video" && (
                    <VideoPopup
                        setPopup={setPopupType}
                        handleFileChange={handleFileChange}
                        handleUpload={handleUploadFiles}
                        tempFiles={tempFiles}
                        handleDeleteTempFile={handleDeleteTempFile}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        title={title}
                        description={description}
                    />
                )}

                {/* Display Uploaded Files */}
                {(imageFiles.length > 0 || videoFiles.length > 0 || codeFiles.length > 0) && (
                    <>
                        <div className="pt-30">
                            <h3 className="text-xl font-medium mb-4">Uploaded Files</h3>

                            <div className="mt-6 py-4 rounded-lg">
                                <h2 className="text-xl font-medium">Project Title : {globalTitle}</h2>
                                <p className="text-gray-600 text-sm mt-2">Project Discripition : {globalDescription}</p>
                            </div>

                            {imageFiles.length > 0 && <FileDisplay files={imageFiles} type="image" handleDelete={handleDeleteFile} />}
                            {videoFiles.length > 0 && <FileDisplay files={videoFiles} type="video" handleDelete={handleDeleteFile} />}
                            {codeFiles.length > 0 && <FileDisplay files={codeFiles} type="code" handleDelete={handleDeleteFile} />}

                            {/* Buttons at Bottom */}

                        </div>
                        <div className="mt-6 flex justify-end mb-5">
                            <button className="bg-gray-500 text-white px-6 py-3 rounded-lg mr-2 cursor-pointer" onClick={handleCancel}>Cancel</button>
                            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer" onClick={handleUpload}>Upload Files</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

// Image Popup Component
const ImagePopup = ({
    setPopup,
    handleFileChange,
    handleUpload,
    tempFiles,
    handleDeleteTempFile,
    setTitle,
    setDescription,
    title,
    description
}) => {
    const [previewFiles, setPreviewFiles] = useState([]);

    // Generate image previews when tempFiles changes
    useEffect(() => {
        if (tempFiles.length > 0) {
            const previews = tempFiles.map(file => (file instanceof File ? URL.createObjectURL(file) : null));
            setPreviewFiles(previews);
        } else {
            setPreviewFiles([]);
        }
    }, [tempFiles]);

    return (
        <div className={`fixed h-screen w-screen inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50`}>
            <div className={`bg-white text-black rounded-xl p-6 w-[90%] max-w-md shadow-lg relative flex flex-col justify-center`}>
                {/* Close Button */}
                <button className="absolute top-4 right-4 text-gray-600 cursor-pointer" onClick={() => setPopup(null)}>✖</button>

                {/* Title */}
                <h2 className="text-[20px] flex items-center gap-2">
                    <i className="ri-file-upload-line"></i>
                    <p className="font-semibold">Upload Images</p>
                </h2>
                <p className="text-gray-500 text-[12px]">Add your images here</p>

                {/* File Upload Box */}
                <label htmlFor="fileInput" className="mt-4 border border-2 border-[#ED9E29] bg-[#FDE8CB] p-6 text-center rounded-lg cursor-pointer h-[25%] flex flex-col justify-center">
                    <i className="ri-file-image-line text-[#ED9E29] text-[22px]"></i>
                    <p className="text-[#ED9E29] font-medium mt-1">Choose Files</p>
                    <input type="file" id="fileInput" accept=".jpg,.png" className="hidden" onChange={handleFileChange} multiple />
                </label>
                <p className="text-gray-500 text-[12px] text-xs mt-1">Only .jpg and .png files. 50 MB max file size.</p>


                {/* Project Name */}
                <label className="text-sm font-medium mt-3 block">Project Name</label>
                <input
                    type="text"
                    placeholder="Enter your project name"
                    className="w-full border rounded-md p-2.5 mt-1 focus:outline-none focus:ring-2 border-gray-300 bg-white text-black"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Project Description */}
                <label className="mt-2 text-sm font-medium">Project Description</label>
                <textarea
                    placeholder="Enter your project description"
                    className="w-full border rounded-md p-2.5 mt-1 focus:outline-none focus:ring-2 border-gray-300 bg-white text-black"
                    value={description}
                    rows={1}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* Uploaded Files Section */}
                <div className="mt-1">
                    <label className="text-sm font-medium">Uploaded Files</label>
                    {previewFiles.length > 0 ? (
                        <div className={`mt-2 ${tempFiles.length > 1 ? 'max-h-15 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300' : ''} space-y-2`}>
                            {previewFiles.map((preview, index) => (
                                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border border-gray-300">
                                    <div className="flex items-center gap-2">
                                        <i className="ri-image-2-line text-[#9E9E9E] text-[25px]"></i>
                                        <div>
                                            <p className="text-[14px] font-medium">{tempFiles[index]?.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {tempFiles[index]?.size
                                                    ? `${(Number(tempFiles[index].size) / (1024 * 1024)).toFixed(2)} MB`
                                                    : "0 MB"}
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDeleteTempFile(index)} className="text-[#9E9E9E] cursor-pointer">
                                        <i class="ri-delete-bin-line text-[22px]"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 mt-2">No files selected</p>
                    )}
                </div>


                {/* Buttons */}
                <div className="mt-4 flex justify-end gap-2">
                    <button className="border border-[#ED9E29] px-4 py-2 rounded-lg text-[#ED9E29] cursor-pointer" onClick={() => setPopup(null)}>Cancel</button>
                    <button className="bg-[#ED9E29] text-white px-4 py-2 rounded-lg cursor-pointer" onClick={handleUpload}>Upload</button>
                </div>
            </div>
        </div>
    );
};

// Code Popup Component
const CodePopup = ({
    setPopup,
    handleFileChange,
    handleUpload,
    tempFiles,
    handleDeleteTempFile,
    setTitle,
    setDescription,
    title,
    description
}) => {
    const [previewFiles, setPreviewFiles] = useState([]);

    // Generate file previews when tempFiles changes
    useEffect(() => {
        if (tempFiles.length > 0) {
            setPreviewFiles(tempFiles.map(file => file?.name || "Unknown File"));
        } else {
            setPreviewFiles([]);
        }
    }, [tempFiles]);

    return (
        <div className="fixed h-screen w-screen inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-xl p-6 w-[90%] max-w-md shadow-lg relative flex flex-col justify-center">
                {/* Close Button */}
                <button className="absolute top-4 right-4 text-gray-600 cursor-pointer" onClick={() => setPopup(null)}>✖</button>

                {/* Title */}
                <h2 className="text-[20px] flex items-center gap-2">
                    <i className="ri-file-upload-line"></i>
                    <p className="font-semibold">Upload Embedded Code</p>
                </h2>
                <p className="text-gray-500 text-[12px]">Add your code files here</p>

                {/* File Upload Box */}
                <label htmlFor="codeFileInput" className="mt-4 border border-2 border-[#376CFF] bg-[#DCE6FF] p-6 text-center rounded-lg cursor-pointer h-[25%] flex flex-col justify-center">
                    <i className="ri-file-code-line text-[#376CFF] text-[22px]"></i>
                    <p className="text-[#376CFF] font-medium mt-1">Choose Files</p>
                    <input type="file" id="codeFileInput" accept=".html,.css,.js" className="hidden" onChange={handleFileChange} multiple />
                </label>
                <p className="text-gray-500 text-[12px] text-xs mt-1">Only .html, .css, .js files. 100 MB max per file.</p>

                {/* Project Name */}
                <label className="text-sm font-medium mt-3 block">Project Name</label>
                <input
                    type="text"
                    placeholder="Enter your project name"
                    className="w-full border rounded-md p-2.5 mt-1 focus:outline-none focus:ring-2 border-gray-300 bg-white text-black"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Project Description */}
                <label className="mt-2 text-sm font-medium">Project Description</label>
                <textarea
                    placeholder="Enter your project description"
                    className="w-full border rounded-md p-2.5 mt-1 focus:outline-none focus:ring-2 border-gray-300 bg-white text-black"
                    rows={1}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* Uploaded Files Section */}
                <div className="mt-1">
                    <label className="text-sm font-medium">Uploaded Files</label>
                    {previewFiles.length > 0 ? (
                        <div className={`mt-2 ${tempFiles.length > 1 ? 'max-h-15 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300' : ''} space-y-2`}>
                            {previewFiles.map((preview, index) => (
                                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border border-gray-300">
                                    <div className="flex items-center gap-2">
                                        <i className="ri-file-zip-line text-[#9E9E9E] text-[25px]"></i>
                                        <div>
                                            <p className="text-[14px] font-medium">{tempFiles[index]?.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {tempFiles[index]?.size
                                                    ? `${(Number(tempFiles[index].size) / (1024 * 1024)).toFixed(2)} MB`
                                                    : "0 MB"}
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDeleteTempFile(index)} className="text-[#9E9E9E] cursor-pointer">
                                        <i className="ri-delete-bin-line text-[22px]"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 mt-2">No files selected</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-end gap-2">
                    <button className="border border-[#376CFF] px-4 py-2 rounded-lg text-[#376CFF] cursor-pointer" onClick={() => setPopup(null)}>Cancel</button>
                    <button className="bg-[#376CFF] text-white px-4 py-2 rounded-lg cursor-pointer" onClick={handleUpload}>Upload</button>
                </div>
            </div>
        </div>
    );
};

// Video Popup Component
const VideoPopup = ({
    setPopup,
    handleFileChange,
    handleUpload,
    tempFiles,
    handleDeleteTempFile,
    setTitle,
    setDescription,
    title,
    description
}) => {
    const [previewFiles, setPreviewFiles] = useState([]);

    // Generate video previews when tempFiles changes
    useEffect(() => {
        if (tempFiles.length > 0) {
            setPreviewFiles(tempFiles.map(file => (file instanceof File ? URL.createObjectURL(file) : null)));
        } else {
            setPreviewFiles([]);
        }
    }, [tempFiles]);

    return (
        <div className="fixed h-screen w-screen inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-xl p-6 w-[90%] max-w-md shadow-lg relative flex flex-col justify-center">
                {/* Close Button */}
                <button className="absolute top-4 right-4 text-gray-600 cursor-pointer" onClick={() => setPopup(null)}>✖</button>

                {/* Title */}
                <h2 className="text-[20px] flex items-center gap-2">
                    <i className="ri-file-upload-line"></i>
                    <p className="font-semibold">Upload Videos</p>
                </h2>
                <p className="text-gray-500 text-[12px]">Add your videos here</p>

                {/* File Upload Box */}
                <label htmlFor="videoFileInput" className="mt-4 border border-2 border-[#C684E0] bg-[#F4D9FF] p-6 text-center rounded-lg cursor-pointer h-[25%] flex flex-col justify-center">
                    <i className="ri-video-line text-[#C684E0] text-[22px]"></i>
                    <p className="text-[#C684E0] font-medium mt-1">Choose Videos</p>
                    <input type="file" id="videoFileInput" accept="video/*" className="hidden" onChange={handleFileChange} multiple />
                </label>
                <p className="text-gray-500 text-[12px] text-xs mt-1">Only video files Max 200MB per file.</p>

                {/* Project Name */}
                <label className="text-sm font-medium mt-3 block">Project Name</label>
                <input
                    type="text"
                    placeholder="Enter project name"
                    className="w-full border rounded-md p-2.5 mt-1 focus:outline-none focus:ring-2 border-gray-300 bg-white text-black"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Project Description */}
                <label className="text-sm mt-2 font-medium">Project Description</label>
                <textarea
                    placeholder="Enter project description"
                    className="w-full border rounded-md p-2.5 mt-1 focus:outline-none focus:ring-2 border-gray-300 bg-white text-black"
                    value={description}
                    rows={1}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* Uploaded Videos Section */}
                <div className="mt-1">
                    <label className="text-sm font-medium">Uploaded Videos</label>
                    {previewFiles.length > 0 ? (
                        <div className={`mt-2 ${tempFiles.length > 1 ? 'max-h-15 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300' : ''} space-y-2`}>
                            {previewFiles.map((preview, index) => (
                                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border border-gray-300">
                                    <div className="flex items-center gap-2">
                                        <i className="ri-video-line text-[#9E9E9E] text-[25px]"></i>
                                        <div>
                                            <p className="text-[14px] font-medium">{tempFiles[index]?.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {tempFiles[index]?.size
                                                    ? `${(Number(tempFiles[index].size) / (1024 * 1024)).toFixed(2)} MB`
                                                    : "0 MB"}
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDeleteTempFile(index)} className="text-[#9E9E9E] cursor-pointer">
                                        <i className="ri-delete-bin-line text-[22px]"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 mt-2">No files selected</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-end gap-2">
                    <button className="border border-[#C684E0] px-4 py-2 rounded-lg text-[#C684E0] cursor-pointer" onClick={() => setPopup(null)}>Cancel</button>
                    <button className="bg-[#C684E0] text-white px-4 py-2 rounded-lg cursor-pointer" onClick={handleUpload}>Upload</button>
                </div>
            </div>
        </div>
    );

};

const FileDisplay = ({ files, type, handleDelete }) => (
    <div className="mt-4">
        <h3 className="text-lg font-medium capitalize">{type} Files</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {files.map((file, index) => (
                <div key={index} className="relative p-2 rounded border border-gray-300">
                    {type === "image" && <img src={file.url} alt={file.name} className="w-full h-64 rounded-lg object-cover pt-10" />}
                    {type === "video" && <video src={file.url} controls className="w-full h-64 rounded-lg object-cover pt-10" />}
                    {type === "code" && <p className="truncate h-8 flex flex-col justify-center pl-2 rounded-lg">{file.name}</p>}
                    <button className="absolute top-2 right-2 text-black cursor-pointer" onClick={() => handleDelete(type, index)}>✖</button>
                </div>
            ))}
        </div>
    </div>
);

export default UploadProjectPage;