import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { Helmet } from "react-helmet";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { CardContainer } from "../UI/3d-card";

const Landingpage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll events for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <Helmet>
        <title>DesignDeck - Landing Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="overflow-x-hidden">
        <div>
          <nav
            className={`fixed top-0 left-0 w-full backdrop-blur-2xl z-50 px-4 sm:px-6 md:px-10 lg:px-16 py-3 flex justify-between items-center transition-all duration-300 ${
              scrolled ? "shadow-md" : ""
            } ${
              theme === "dark"
                ? "bg-[#000000c3] text-white"
                : "bg-[#ffffffc3] text-black"
            }`}
          >
            {/* Logo */}
            <div className="text-xl sm:text-2xl font-semibold">DesignDeck</div>

            {/* Mobile Menu Button */}
            <button className="block md:hidden" onClick={toggleMobileMenu} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-2 lg:space-x-6 text-base lg:text-lg">
              <a
                href="#home"
                className={`cursor-pointer relative px-1 after:block after:h-[2px] after:w-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full ${
                  theme === "dark"
                    ? "text-gray-300 after:bg-gray-300"
                    : "text-gray-700 after:bg-gray-700"
                }`}
              >
                Home
              </a>
              <a
                href="#features"
                className={`cursor-pointer relative px-1 after:block after:h-[2px] after:w-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full ${
                  theme === "dark"
                    ? "text-gray-300 after:bg-gray-300"
                    : "text-gray-700 after:bg-gray-700"
                }`}
              >
                Features
              </a>
              <a
                href="#aboutus"
                className={`cursor-pointer relative px-1 after:block after:h-[2px] after:w-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full ${
                  theme === "dark"
                    ? "text-gray-300 after:bg-gray-300"
                    : "text-gray-700 after:bg-gray-700"
                }`}
              >
                About us
              </a>
              <a
                href="#explore"
                className={`cursor-pointer relative px-1 after:block after:h-[2px] after:w-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full ${
                  theme === "dark"
                    ? "text-gray-300 after:bg-gray-300"
                    : "text-gray-700 after:bg-gray-700"
                }`}
              >
                Explore
              </a>
            </div>

            {/* Desktop Login Button */}
            <div className="hidden md:block">
              <Link to="/signin">
                <button
                  className={`px-4 lg:px-6 py-2 rounded-full shadow-md border backdrop-blur-md cursor-pointer transition-all duration-300 text-sm lg:text-base ${
                    theme === "dark"
                      ? "bg-purple-600 text-white border-white/50 hover:bg-purple-700"
                      : "bg-purple-500 text-white border-white/50 hover:bg-purple-600"
                  }`}
                >
                  Login
                </button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              className={`fixed top-14 left-0 w-full z-40 py-4 px-4 flex flex-col space-y-4 md:hidden transition-all duration-300 shadow-lg ${
                theme === "dark"
                  ? "bg-[#000000ee] text-white"
                  : "bg-[#ffffffee] text-black"
              }`}
            >
              <a
                href="#home"
                className={`cursor-pointer px-4 py-2 rounded-md transition-colors ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
                onClick={toggleMobileMenu}
              >
                Home
              </a>
              <a
                href="#features"
                className={`cursor-pointer px-4 py-2 rounded-md transition-colors ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
                onClick={toggleMobileMenu}
              >
                Features
              </a>
              <a
                href="#aboutus"
                className={`cursor-pointer px-4 py-2 rounded-md transition-colors ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
                onClick={toggleMobileMenu}
              >
                About us
              </a>
              <a
                href="#explore"
                className={`cursor-pointer px-4 py-2 rounded-md transition-colors ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
                onClick={toggleMobileMenu}
              >
                Explore
              </a>
              <Link to="/signin" onClick={toggleMobileMenu}>
                <button
                  className={`w-full px-4 py-2 rounded-full shadow-md border backdrop-blur-md cursor-pointer transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-purple-600 text-white border-white/50 hover:bg-purple-700"
                      : "bg-purple-400 text-white border-white/50 hover:bg-purple-500"
                  }`}
                >
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Home Section */}
        <div
          id="home"
          className={`pt-24 pb-12 sm:pt-28 md:pt-36 lg:pt-40 px-4 sm:px-6 md:px-16 lg:px-20 flex flex-col items-center text-center transition-all duration-300 ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex flex-col items-center">
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight max-w-3xl md:max-w-4xl lg:max-w-5xl drop-shadow-lg transition-all duration-300 ${
                theme === "dark" ? "text-white" : "text-gray-900"
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
              className={`mt-4 max-w-xl px-4 md:max-w-2xl lg:text-lg transition-all duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Your creativity deserves the perfect stage welcome to DesignDeck.
            </p>
          </div>

          {/* Buttons Container */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`mt-2 transition-all duration-300 sm:mt-6 px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold rounded-full shadow-md 
                                ${
                                  theme === "dark"
                                    ? "bg-white border-gray-300 text-black border-opacity-40 hover:bg-gray-100"
                                    : "bg-black border-[#A0A0A0] border-opacity-40 text-white hover:bg-gray-900"
                                } 
                                backdrop-blur-md cursor-pointer flex flex-row items-center`}
            >
              {theme === "dark" ? (
                <>
                  <Moon className="text-black mr-2" size={16} />
                  Light Mode
                </>
              ) : (
                <>
                  <Sun className="text-white mr-2" size={16} />
                  Dark Mode
                </>
              )}
            </button>

            <Link to="/signup">
              <button className="mt-2 sm:mt-6 px-5 sm:px-7 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold bg-[#376CFF] text-white rounded-full shadow-md border border-white/50 backdrop-blur-md cursor-pointer hover:bg-[#2a5aed] transition-colors">
                Get Started
              </button>
            </Link>
          </div>

          {/* Image Section */}
          <div className="mt-8 sm:mt-10 flex flex-col md:flex-row gap-4 sm:gap-6 max-w-5xl">
            <div className="w-full md:w-1/2 rounded-[20px] sm:rounded-[30px] overflow-hidden">
              <img
                src="./public/image.jpg"
                alt="Creative Design Showcase"
                className={`w-full h-auto rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                  theme === "dark" ? "brightness-90" : "brightness-100"
                }`}
              />
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0 rounded-[20px] sm:rounded-[30px] overflow-hidden">
              <img
                src="./public/image-1.jpg"
                alt="Growth Stats"
                className={`w-full h-auto rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                  theme === "dark" ? "brightness-90" : "brightness-100"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div
          id="features"
          className={`py-10 sm:py-14 md:py-18 lg:py-20 text-center transition-all duration-300 ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-bold transition-all duration-300 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Explore the Power of{" "}
              <span
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-black"
                }`}
              >
                DesignDeck
              </span>
            </h2>
            <p
              className={`mt-2 sm:mt-3 md:mt-4 px-4 transition-all duration-300 max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              DesignDeck is a powerful platform to showcase your designs, upload
              code, share visuals, and connect with a vibrant creative
              community.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
            {/* Card 1 */}
            <div className="flex justify-center">
              <CardContainer className="w-full sm:w-auto">
                <div
                  className={`rounded-xl h-[280px] sm:h-[300px] w-full sm:w-[320px] md:w-[350px] flex flex-col gap-3 p-4 sm:p-5 md:p-6 transition-all border-3 border-[#FDE8CB] ${
                    theme === "dark"
                      ? "bg-[#2a2a2a] hover:border-[#444] shadow-[0_0_15px_4px_rgba(255,255,255,0.20)]"
                      : "bg-white hover:border-[#fff] hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center justify-center rounded-[10px] w-12 h-12 bg-[#FDE8CB] self-start">
                    <i className="ri-gallery-line text-[24px] text-[#ED9E29]"></i>
                  </div>
                  <h3
                    className={`font-semibold text-left text-lg sm:text-xl mt-2 sm:mt-3 transition-all ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    Image & Video Upload
                  </h3>
                  <p
                    className={`text-sm sm:text-base mt-1 sm:mt-2 text-left transition-all ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    DesignDeck empowers creators with Image & Video Upload for
                    seamless media sharing, portfolio building, and high-quality
                    project showcasing.
                  </p>
                </div>
              </CardContainer>
            </div>

            {/* Card 2 */}
            <div className="flex justify-center">
              <CardContainer className="w-full sm:w-auto">
                <div
                  className={`rounded-xl h-[280px] sm:h-[300px] w-full sm:w-[320px] md:w-[350px] flex flex-col gap-3 p-4 sm:p-5 md:p-6 transition-all border-3 border-[#DCE6FF] ${
                    theme === "dark"
                      ? "bg-[#2a2a2a] hover:border-[#444] shadow-[0_0_15px_4px_rgba(255,255,255,0.20)]"
                      : "bg-white hover:border-[#fff] hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center justify-center rounded-[10px] w-12 h-12 bg-[#DCE6FF] self-start">
                    <i className="ri-live-line text-[24px] text-[#4A4AFF]"></i>
                  </div>
                  <h3
                    className={`font-semibold text-left text-lg sm:text-xl mt-2 sm:mt-3 transition-all ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    Live Preview
                  </h3>
                  <p
                    className={`text-sm sm:text-base mt-1 sm:mt-2 text-left transition-all ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    DesignDeck empowers creators with Live Preview for real-time
                    coding, instant feedback, interactive design testing, and
                    enhanced development efficiency.
                  </p>
                </div>
              </CardContainer>
            </div>

            {/* Card 3 */}
            <div className="flex justify-center">
              <CardContainer className="w-full sm:w-auto">
                <div
                  className={`rounded-xl h-[280px] sm:h-[300px] w-full sm:w-[320px] md:w-[350px] flex flex-col gap-3 p-4 sm:p-5 md:p-6 transition-all border-3 border-[#F4D9FF] ${
                    theme === "dark"
                      ? "bg-[#2a2a2a] hover:border-[#444] shadow-[0_0_15px_4px_rgba(255,255,255,0.20)]"
                      : "bg-white hover:border-[#fff] hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center justify-center rounded-[10px] w-12 h-12 bg-[#F4D9FF] self-start">
                    <i className="ri-bard-line text-[24px] text-[#A64CA6]"></i>
                  </div>
                  <h3
                    className={`font-semibold text-left text-lg sm:text-xl mt-2 sm:mt-3 transition-all ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Future of DesignDeck
                  </h3>
                  <p
                    className={`text-sm sm:text-base mt-1 sm:mt-2 text-left transition-all ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Future of DesignDeck to revolutionize creative possibilities,
                    streamline workflows, boost collaboration, and unlock
                    limitless innovation for designers and developers.
                  </p>
                </div>
              </CardContainer>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div
          id="aboutus"
          className={`py-12 sm:py-16 transition-all duration-300 ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 xl:px-6 flex flex-col md:flex-row items-center gap-8">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
              <video 
                muted 
                autoPlay 
                loop 
                src="/public/graph.mp4" 
                className="rounded-lg w-full shadow-lg"
                playsInline
              ></video>
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 md:pl-4 lg:pl-8">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold transition-all ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Next-Generation Design & Code Showcase
              </h2>
              <p
                className={`mt-3 sm:mt-4 text-base sm:text-lg transition-all ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                DesignDeck is a cutting-edge design and development showcase
                platform where creators, developers, and designers can upload,
                preview, and share their work seamlessly. With real-time code
                previews, media uploads, and an interactive community, it brings
                innovation to the forefront.
              </p>

              {/* Stats Cards */}
              <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                {/* Card 1 */}
                <div className="border-3 rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-center hover:cursor-pointer transition-all border-[#FDE8CB] hover:bg-[#FDE8CB] hover:scale-105">
                  <span className="text-lg sm:text-xl font-semibold transition-all text-[#ED9E29]">
                    7000+
                  </span>
                  <p className="text-xs sm:text-sm opacity-70 transition-all text-[#ED9E29]">
                    Designs
                  </p>
                </div>

                {/* Card 2 */}
                <div className="border-3 rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-center hover:cursor-pointer transition-all border-[#DCE6FF] hover:bg-[#DCE6FF] hover:scale-105">
                  <span className="text-lg sm:text-xl font-semibold transition-all text-[#9091FF]">
                    10,000+
                  </span>
                  <p className="text-xs sm:text-sm opacity-70 transition-all text-[#9091FF]">
                    Creators
                  </p>
                </div>

                {/* Card 3 */}
                <div className="border-3 rounded-xl px-3 sm:px-5 py-2 sm:py-3 text-center hover:cursor-pointer transition-all border-[#F4D9FF] hover:bg-[#F4D9FF] hover:scale-105">
                  <span className="text-lg sm:text-xl font-semibold transition-all text-[#D87EF5]">
                    50+
                  </span>
                  <p className="text-xs sm:text-sm opacity-70 transition-all text-[#D87EF5]">
                    Design Styles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Section */}
        <section
          id="explore"
          className={`w-full relative py-14 px-4 sm:px-6 md:px-10 lg:px-20 transition-all duration-300 ${
            theme === "dark"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
            {/* Left Side - Title & Description */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
                Let's Connect
              </h2>
              <p className="text-base sm:text-lg text-gray-400 md:w-[85%]">
                Got questions? Need help? We're here for you! Reach out to us
                for anything related to admissions, courses, or assistance.
              </p>
            </div>

            {/* Right Side - Contact Card with Aesthetic Gradient */}
            <div className="relative w-full md:w-auto p-6 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#d946ef] shadow-xl text-center mt-6 md:mt-0">
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-white">
                Contact Us
              </h3>
              <p className="text-sm sm:text-base text-gray-200 mb-6">
                We're just a click away for your queries!
              </p>
              <Link to="/contactus">
                <button className="bg-white text-indigo-600 text-base sm:text-lg font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-gray-200 hover:scale-105 shadow-md cursor-pointer">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </section>

        <hr
          className={`border-t transition-all ${
            theme === "dark" ? "border-gray-700" : "border-gray-300"
          }`}
        />

        {/* Footer Section */}
        <footer
          className={`py-4 sm:py-6 px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 transition-all ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          {/* Left Side - Copyright */}
          <p className="text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} DesignDeck. All rights reserved.
          </p>

          {/* Right Side - Social Media Links */}
          <div className="flex space-x-4 sm:space-x-6">
            <a
              href="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:transition-all hover:scale-110 ${
                theme === "dark" ? "hover:text-gray-400" : "hover:text-gray-600"
              }`}
              aria-label="GitHub"
            >
              <i className="ri-github-line text-lg sm:text-xl"></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:transition-all hover:scale-110 ${
                theme === "dark" ? "hover:text-gray-400" : "hover:text-gray-600"
              }`}
              aria-label="Twitter"
            >
              <i className="ri-twitter-x-line text-lg sm:text-xl"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:transition-all hover:scale-110 ${
                theme === "dark" ? "hover:text-gray-400" : "hover:text-gray-600"
              }`}
              aria-label="Instagram"
            >
              <i className="ri-instagram-line text-lg sm:text-xl"></i>
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landingpage;