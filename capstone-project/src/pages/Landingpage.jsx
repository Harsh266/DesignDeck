import { Link } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Landingpage = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <Helmet>
                <title>DesignDeck - Landing Page</title>
            </Helmet>
            <div>
                <div>
                    <nav
                        className={`fixed top-0 left-0 w-full backdrop-blur-2xl z-50 px-10 py-3 flex justify-between items-center transition-all duration-300 ${theme === "dark" ? "bg-[#000000c3] text-white" : "bg-[#ffffffc3] text-black"}`}
                    >
                        {/* Logo */}
                        <div className="text-2xl font-semibold">DesignDeck</div>

                        {/* Menu */}
                        <div className="flex space-x-10 text-lg">
                            <a
                                href="#home"
                                className={`cursor-pointer relative after:block after:h-[2px] after:w-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full ${theme === "dark" ? "text-gray-300 after:bg-gray-300" : "text-gray-700 after:bg-gray-700"}`}
                            >
                                Home
                            </a>
                            <a
                                href="#features"
                                className={`cursor-pointer relative after:block after:h-[2px] after:w-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full ${theme === "dark" ? "text-gray-300 after:bg-gray-300" : "text-gray-700 after:bg-gray-700"}`}
                            >
                                Features
                            </a>
                            <a
                                href="#aboutus"
                                className={`cursor-pointer relative after:block after:h-[2px] after:w-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full ${theme === "dark" ? "text-gray-300 after:bg-gray-300" : "text-gray-700 after:bg-gray-700"}`}
                            >
                                About us
                            </a>
                            <a
                                href="#explore"
                                className={`cursor-pointer relative after:block after:h-[2px] after:w-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full ${theme === "dark" ? "text-gray-300 after:bg-gray-300" : "text-gray-700 after:bg-gray-700"}`}
                            >
                                Explore
                            </a>
                        </div>


                        {/* Login Button */}
                        <Link to="/signin">
                            <button
                                className={`px-6 py-2 rounded-full border-5 shadow-md border backdrop-blur-md cursor-pointer transition-all duration-300 ${theme === "dark" ? "bg-purple-600 text-white border-white/50" : "bg-purple-400 text-white border-white/50"}`}
                            >
                                Login
                            </button>
                        </Link>
                    </nav>

                </div>

                {/* Home Section */}
                <div
                    id="home"
                    className={`py-40 px-6 md:px-16 flex flex-col items-center text-center transition-all duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                        }`}
                >
                    <h1
                        className={`text-4xl md:text-4xl font-semibold leading-tight max-w-3xl drop-shadow-lg transition-all duration-300 ${theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                    >
                        Your Designs, Your Code, Your Platform The Ultimate Creative Hub
                        <span className="mr-2"></span>
                        <span className="relative inline-block group">
                            <span
                                className="text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-[gradientBG_3s_ease-in-out_infinite] bg-clip-text text-transparent cursor-pointer"
                                style={{
                                    backgroundSize: "200% 200%",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                DesignDeck
                            </span>
                        </span>
                    </h1>

                    <p
                        className={`mt-4 max-w-xl transition-all duration-300 ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                            }`}
                    >
                        Your creativity deserves the perfect stage welcome to DesignDeck.
                    </p>

                    {/* Buttons Container */}
                    <div className="mt-6 flex items-center justify-center gap-4">
                        {/* Dark Mode Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className={`mt-6 px-5 py-3 text-lg font-semibold text-lg rounded-full border-5 shadow-md 
                                ${theme === "dark" ? "bg-white border-white text-black border-opacity-20 " : "bg-black border-[#A0A0A0] border-opacity-40 text-white"} 
                                backdrop-blur-md cursor-pointer flex flex-row items-center`}
                        >
                            {theme === "dark" ? (
                                <>
                                    <Moon className="text-black mr-2" size={22} />
                                    Light Mode
                                </>
                            ) : (
                                <>
                                    <Sun className="text-white mr-2" size={22} />
                                    Dark Mode
                                </>
                            )}
                        </button>

                        <Link to="/signup">
                            <button className="mt-6 px-7 py-3 text-lg font-semibold bg-[#376CFF] text-white rounded-full border-5 shadow-md border border-white/50 backdrop-blur-md cursor-pointer">
                                Get Started
                            </button>
                        </Link>
                    </div>

                    {/* Image Section */}
                    <div className="mt-12 flex flex-col md:flex-row gap-6 max-w-5xl">
                        <div>
                            <img
                                src="./public/image.jpg"
                                alt="Creative Design Showcase"
                                className={`w-full rounded-lg shadow-lg transition-all duration-300 ${theme === "dark" ? "brightness-90" : "brightness-100"
                                    }`}
                            />
                        </div>
                        <div>
                            <img
                                src="./public/image-1.jpg"
                                alt="Growth Stats"
                                className={`w-full rounded-lg shadow-lg transition-all duration-300 ${theme === "dark" ? "brightness-90" : "brightness-100"
                                    }`}
                            />
                        </div>
                    </div>
                </div>


                {/* Features Section */}
                <div
                    id="features"
                    className={`py-16 text-center pt-30 transition-all duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                        }`}
                >
                    <div className="max-w-4xl mx-auto">
                        <h2
                            className={`text-3xl font-bold transition-all duration-300 ${theme === "dark" ? "text-white" : "text-gray-900"
                                }`}
                        >
                            Explore the Power of{" "}
                            <span className={`${theme === "dark" ? "text-gray-300" : "text-black"}`}>
                                DesignDeck
                            </span>
                        </h2>
                        <p
                            className={`mt-2 transition-all duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            DesignDeck is a powerful platform to showcase your designs, upload code, share
                            visuals, and connect with a vibrant creative community.
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
                        {/* Card 1 */}
                        <div
                            className={`rounded-xl flex flex-col gap-2 p-6 transition-all border-3 border-[#FDE8CB] ${theme === "dark"
                                ? "bg-black hover:border-[#000] hover:border-[#000] shadow-[0_0_15px_4px_rgba(255,255,255,0.20)]"
                                : "bg-white hover:border-[#fff] hover:shadow-lg"
                                }`}
                        >
                            <div
                                className="flex items-center justify-center rounded-[10px] w-12 h-12 bg-[#FDE8CB] self-start"
                            >
                                <i
                                    className="ri-gallery-line text-[28px] text-[#ED9E29]"
                                ></i>
                            </div>
                            <h3
                                className={`font-semibold text-lg mt-4 transition-all text-left ${theme === "dark" ? "text-white" : "text-black"
                                    }`}
                            >
                                Image & Video Upload
                            </h3>
                            <p
                                className={`text-sm mt-2 text-justify transition-all ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                    }`}
                            >
                                DesignDeck empowers creators with Image & Video Upload for seamless media
                                sharing, portfolio building, and high-quality project showcasing.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div
                            className={`rounded-xl flex flex-col gap-2 p-6 transition-all border-3 border-[#DCE6FF] ${theme === "dark"
                                ? "bg-black hover:border-[#000] hover:border-[#000] shadow-[0_0_15px_4px_rgba(255,255,255,0.20)]"
                                : "bg-white hover:border-[#fff] hover:shadow-lg"
                                }`}
                        >
                            <div
                                className="flex items-center justify-center rounded-[10px] w-12 h-12 bg-[#DCE6FF] self-start"
                            >
                                <i
                                    className="ri-live-line text-[28px] text-[#9091FF]"
                                ></i>
                            </div>
                            <h3
                                className={`font-semibold text-left text-lg mt-4 transition-all ${theme === "dark" ? "text-white" : "text-black"
                                    }`}
                            >
                                Live Preview
                            </h3>
                            <p
                                className={`text-sm mt-2 text-justify transition-all ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                    }`}
                            >
                                DesignDeck empowers creators with Live Preview for real-time coding, instant
                                feedback, interactive design testing, and enhanced development efficiency.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div
                            className={`rounded-xl flex flex-col gap-2 p-6 transition-all border-3 border-[#F4D9FF] ${theme === "dark"
                                ? "bg-black hover:border-[#000] hover:border-[#000] shadow-[0_0_15px_4px_rgba(255,255,255,0.20)]"
                                : "bg-white hover:border-[#fff] hover:shadow-lg"
                                }`}
                        >
                            <div
                                className="flex items-center justify-center rounded-[10px] w-12 h-12 bg-[#F4D9FF] self-start"
                            >
                                <i
                                    className="ri-bard-line text-[28px] text-[#D87EF5]"
                                ></i>
                            </div>
                            <h3
                                className={`font-semibold text-lg text-left mt-4 transition-all ${theme === "dark" ? "text-white" : "text-gray-900"
                                    }`}
                            >
                                Future of Design Deck
                            </h3>
                            <p
                                className={`text-sm mt-2 text-justify transition-all ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                    }`}
                            >
                                Future of DesignDeck to revolutionize creative possibilities, streamline
                                workflows, boost collaboration, and unlock limitless innovation for designers
                                and developers.
                            </p>
                        </div>
                    </div>
                </div>


                {/* About Us Section */}
                <div
                    id="aboutus"
                    className={`py-16 pt-20 transition-all duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                        }`}
                >
                    <div className="max-w-6xl mx-auto px-6 md:px-12 xl:px-6 flex flex-wrap items-center">
                        {/* Image Section */}
                        <div className="w-full md:w-1/2">
                            <img
                                src="/public/About.png"
                                alt="Analytics Graph"
                                className="rounded-lg"
                            />
                        </div>

                        {/* Text Section */}
                        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-10">
                            <h2
                                className={`text-3xl md:text-4xl font-bold transition-all ${theme === "dark" ? "text-white" : "text-gray-900"
                                    }`}
                            >
                                Next-Generation Design & Code Showcase
                            </h2>
                            <p
                                className={`mt-4 text-lg transition-all ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                    }`}
                            >
                                DesignDeck is a cutting-edge design and development showcase platform where
                                creators, developers, and designers can upload, preview, and share their work
                                seamlessly. With real-time code previews, media uploads, and an interactive
                                community, it brings innovation to the forefront.
                            </p>

                            {/* Stats Cards */}
                            <div className="mt-6 flex flex-wrap gap-4">
                                {/* Card 1 */}
                                <div
                                    className="border-4 rounded-xl px-8 py-4 text-center hover:cursor-pointer transition-all border-[#FDE8CB] hover:bg-[#FDE8CB]"
                                >
                                    <span
                                        className="text-xl font-semibold transition-all text-[#ED9E29]"
                                    >
                                        7000+
                                    </span>
                                    <p
                                        className="text-sm opacity-70 transition-all text-[#ED9E29]"
                                    >
                                        Designs
                                    </p>
                                </div>

                                {/* Card 2 */}
                                <div
                                    className="border-4 rounded-xl px-8 py-4 text-center hover:cursor-pointer transition-all border-[#DCE6FF] hover:bg-[#DCE6FF]"
                                >
                                    <span
                                        className="text-xl font-semibold transition-all text-[#9091FF]"
                                    >
                                        10,000+
                                    </span>
                                    <p
                                        className="text-sm opacity-70 transition-all text-[#9091FF]"
                                    >
                                        Creators
                                    </p>
                                </div>

                                {/* Card 3 */}
                                <div
                                    className="border-4 rounded-xl px-6 py-4 text-center hover:cursor-pointer transition-all border-[#F4D9FF] hover:bg-[#F4D9FF]"
                                >
                                    <span
                                        className="text-xl font-semibold transition-all text-[#D87EF5]"
                                    >
                                        50+
                                    </span>
                                    <p
                                        className="text-sm opacity-70 transition-all text-[#D87EF5]"
                                    >
                                        Design Styles
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Explore Section */}
                <div
                    id="explore"
                    className={`py-4 px-6 md:px-4 lg:px-24 transition-all duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                        }`}
                >
                    <div className="relative w-full">
                        {/* Full-Width Image */}
                        <img
                            src="/public/Contact.png"
                            alt="Contact Us"
                            className="w-full h-auto rounded-2xl"
                        />

                        {/* Overlay Content */}
                        <div className="absolute inset-0 flex items-center px-10 md:px-20">
                            {/* Left Side - Title & Description */}
                            <div className="max-w-lg pl-15">
                                <h2
                                    className="text-4xl font-bold mb-4 transition-all text-white"
                                >
                                    Get in Touch
                                </h2>
                                <p
                                    className="text-sm text-white"
                                >
                                    Have questions or need assistance? We're here to help! Reach out to us for
                                    inquiries about admissions, courses, or any other details. Our team is just a
                                    call or email away!
                                </p>
                            </div>

                            {/* Right Side - Button */}
                            <div className="ml-auto pr-15">
                                <Link to="/contactus"><button className="bg-white text-[#013C82] text-lg font-semibold py-4 px-8 rounded-lg cursor-pointer">
                                    Contact Us
                                </button></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className={`border-t transition-all ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />

                {/* Footer Section */}
                <footer
                    className={`py-4 px-6 flex justify-between items-center transition-all ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                        }`}
                >
                    {/* Left Side - Copyright */}
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} DesignDeck. All rights reserved.
                    </p>

                    {/* Right Side - Social Media Links */}
                    <div className="flex space-x-4">
                        <a
                            href="www.github.com"
                            className={`hover:transition-all ${theme === "dark" ? "hover:text-gray-400" : "hover:text-gray-600"
                                }`}
                        >
                            <i className="ri-github-line text-xl"></i>
                        </a>
                        <a
                            href="www.twitter.com"
                            className={`hover:transition-all ${theme === "dark" ? "hover:text-gray-400" : "hover:text-gray-600"
                                }`}
                        >
                            <i className="ri-twitter-x-line text-xl"></i>
                        </a>
                        <a
                            href="www.instagram.com"
                            className={`hover:transition-all ${theme === "dark" ? "hover:text-gray-400" : "hover:text-gray-600"
                                }`}
                        >
                            <i className="ri-instagram-line text-xl"></i>
                        </a>
                    </div>
                </footer>

            </div>
        </>
    );
};
export default Landingpage;
