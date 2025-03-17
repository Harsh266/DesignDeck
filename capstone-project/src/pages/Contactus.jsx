import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/toastStyles.css";

const Contactus = () => {
    const { theme } = useContext(ThemeContext);

    // Custom toast styles
    const getCustomToastStyle = (theme) => ({
        borderRadius: "5px", // Less rounded
        padding: "18px 25px",
        fontSize: "14px",
        fontWeight: "500",
        textAlign: "left", // Align text properly
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Ensures proper spacing
        gap: "10px", // Adds space between text and close icon
        boxShadow: theme === "dark"
            ? "0px 4px 10px rgba(255, 255, 255, 0.2)"
            : "0px 4px 10px rgba(0, 0, 0, 0.1)",
        background: theme === "dark" ? "#181818" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
        border: theme === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #ddd",
        width: "320px", // Fixed width for consistency
    });
    

    const progressStyle = { background: "#0099FF" }; // Light Blue Progress Bar

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/contact/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast("Message sent successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: getCustomToastStyle(theme),
                    progressStyle, // Light Blue Progress Bar
                });
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error(data.message || "Failed to send message!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: getCustomToastStyle(theme),
                    progressStyle, // Light Blue Progress Bar
                });
            }
        } catch (error) {
            toast.error("Something went wrong! Try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: getCustomToastStyle(theme),
                progressStyle, // Light Blue Progress Bar
            });
        }
        setLoading(false);
    };

    return (
        <>
            <Helmet>
                <title>DesignDeck - Contact Us</title>
            </Helmet> 
            <ToastContainer toastClassName={() => "custom-toast"} 
            progressClassName="custom-toast-progress" />
            <div className={`flex flex-col lg:flex-row items-center justify-between min-h-screen h-screen p-6 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
                <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center p-10">
                    <Link to="/logout">
                        <h1 className="text-xl font-semibold absolute top-7 left-10">DesignDeck</h1>
                    </Link>
                    <div className="px-8 md:px-16 flex flex-col justify-center">
                        <h2 className="text-3xl font-semibold mb-3">Get in Touch</h2>
                        <p className={`text-sm mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            We will get back to you as soon as possible
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full border rounded-full px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 border-2 
                                    ${theme === "dark" ? "bg-black border-gray-800 text-white focus:ring-[#0099FF]" : "bg-white border-gray-100 text-black focus:ring-[#376CFF]"}`}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your E-Mail ID"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full border rounded-full px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 border-2 
                                    ${theme === "dark" ? "bg-black border-gray-800 text-white focus:ring-[#0099FF]" : "bg-white border-gray-100 text-black focus:ring-[#376CFF]"}`}
                            />
                            <textarea
                                name="message"
                                placeholder="Message"
                                rows="5"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full border rounded-[20px] px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 border-2 
                                    ${theme === "dark" ? "bg-black border-gray-800 text-white focus:ring-[#0099FF]" : "bg-white border-gray-100 text-black focus:ring-[#376CFF]"}`}
                            ></textarea>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#376CFF] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300 cursor-pointer flex items-center justify-center"
                            >
                                {loading ? "Sending..." : <><i className="ri-send-plane-line mr-2"></i> Send Message</>}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="hidden lg:flex w-1/2 h-screen items-center justify-end p-8">
                    <img src="/Contactus.png" alt="Contact Us" className="w-[85%] h-full rounded-lg" />
                </div>
            </div>
        </>
    );
};

export default Contactus;
