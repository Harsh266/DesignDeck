import { Link } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'
import { Helmet } from "react-helmet";

const Landingpage = () => {
    return (
        <>
            <Helmet>
                <title>DesignDeck - Landing Page</title>
            </Helmet>
            <div>
                <div>
                    <nav className="fixed top-0 left-0 w-full bg-[#ffffffc3] backdrop-blur-2xl z-50 px-10 py-3 flex justify-between items-center">
                        {/* Logo */}
                        <div className="text-2xl font-semibold">DesignDeck</div>

                        {/* Menu */}
                        <div className="flex space-x-10 text-lg">
                            <a href="#home" className="text-gray-700 cursor-pointer relative after:block after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
                                Home
                            </a>
                            <a href="#features" className="text-gray-700 cursor-pointer relative after:block after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
                                Features
                            </a>
                            <a href="#about" className="text-gray-700 cursor-pointer relative after:block after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
                                About us
                            </a>
                            <a href="#explore" className="text-gray-700 cursor-pointer relative after:block after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">
                                Explore
                            </a>
                        </div>



                        {/* Login Button */}
                        <Link to="/signin"><button className="px-6 py-2 bg-purple-400 text-white rounded-full border-5 shadow-md border border-white/50 backdrop-blur-md cursor-pointer">
                            Login
                        </button></Link>
                    </nav>
                </div>

                {/* Home Section */}
                <div id="home" className="text-black py-40 px-6 md:px-16 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-4xl font-semibold leading-tight max-w-3xl text-gray-900 drop-shadow-lg">
                        Your Designs, Your Code, Your Platform
                        The Ultimate Creative Hub 
                        <span className="mr-2"></span>
                        <span className="relative inline-block group">
                            <span className="transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 cursor-pointer">
                                DesignDeck
                            </span>
                            {/* Left-to-Right Underline Effect */}
                            <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                    </h1>

                    <p className="text-gray-400 mt-4 max-w-xl">
                        Your creativity deserves the perfect stage welcome to DesignDeck
                    </p>
                    <Link to="/signup"><button className="mt-6 px-10 py-3 text-lg font-semibold bg-[#376CFF] text-white rounded-full border-5 shadow-md border border-white/50 backdrop-blur-md cursor-pointer">
                        Get Started
                    </button></Link>

                    <div className="mt-12 flex flex-col md:flex-row gap-6 max-w-5xl">
                        <div>
                            <img
                                src="./public/image.jpg"
                                alt="Creative Design Showcase"
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>
                        <div>
                            <img
                                src="./public/image-1.jpg"
                                alt="Growth Stats"
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="py-16 bg-white text-center pt-30">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Explore the Power of <span className="text-black">DesignDeck</span>
                        </h2>
                        <p className="text-gray-500 mt-2">
                            DesignDeck is a powerful platform to showcase your designs, upload code, share visuals, and connect with a vibrant creative community.
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
                        {/* Card 1 */}
                        <div className="bg-white border-3 border-[#FDE8CB] rounded-xl flex flex-col gap-2 p-6 hover:shadow-lg transition-all hover:border-[#fff]">
                            <div className="flex items-center justify-center bg-[#FDE8CB] rounded-[10px] w-12 h-12 mx-auto">
                                <i className="ri-gallery-line text-[#ED9E29] text-[28px]"></i>
                            </div>
                            <h3 className="font-semibold text-lg text-gray-900 mt-4">Image & Video Upload</h3>
                            <p className="text-gray-500 text-sm mt-2 text-justify">
                                DesignDeck empowers creators with Image & Video Upload for seamless media sharing, portfolio building, and high-quality project showcasing.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white border-3 border-[#DCE6FF] rounded-xl flex flex-col gap-2 p-6 hover:shadow-lg transition-all hover:border-[#fff]">
                            <div className="flex items-center justify-center bg-[#DCE6FF] rounded-[10px] w-12 h-12 mx-auto">
                                <i className="ri-live-line text-[#9091FF] text-[28px]"></i>
                            </div>
                            <h3 className="font-semibold text-lg text-gray-900 mt-4">Live Preview</h3>
                            <p className="text-gray-500 text-sm mt-2 text-justify">
                                DesignDeck empowers creators with Live Preview for real-time coding, instant feedback, interactive design testing, and enhanced development efficiency.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white border-3 border-[#F4D9FF] rounded-xl p-6 flex flex-col gap-2 hover:shadow-lg transition-all hover:border-[#fff]">
                            <div className="flex items-center justify-center bg-[#F4D9FF] rounded-[10px] w-12 h-12 mx-auto">
                                <i className="ri-bard-line text-[#D87EF5] text-[28px]"></i>
                            </div>
                            <h3 className="font-semibold text-lg text-gray-900 mt-4">Future of Design Deck</h3>
                            <p className="text-gray-500 text-sm mt-2 text-justify">
                                Future of DesignDeck to revolutionize creative possibilities, streamline workflows, boost collaboration, and unlock limitless innovation for designers and developers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* About us Section */}
                <div id="about" className="bg-white py-16 pt-20">
                    <div className="max-w-6xl mx-auto px-6 md:px-12 xl:px-6 flex flex-wrap items-center">
                        <div className="w-full md:w-1/2 ">
                            <img src="/public/About.jpg" alt="Analytics Graph" className="rounded-lg shadow-lg" />
                        </div>
                        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Next-Generation Design & Code Showcase
                            </h2>
                            <p className="text-gray-600 mt-4 text-lg">
                                DesignDeck is a cutting-edge design and development showcase platform where creators, developers,
                                and designers can upload, preview, and share their work seamlessly. With real-time code previews,
                                media uploads, and an interactive community, it brings innovation to the forefront.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-4">
                                <div className="border-4 border-[#FDE8CB] rounded-xl px-8 py-4 text-center hover:bg-[#FDE8CB] cursor-pointer">
                                    <span className="text-xl font-semibold text-[#ED9E29]">7000+</span>
                                    <p className="text-[#ED9E29] text-sm opacity-70">Designs</p>
                                </div>
                                <div className="border-4 border-[#DCE6FF] rounded-xl px-8 py-4 text-center hover:bg-[#DCE6FF] cursor-pointer">
                                    <span className="text-xl font-semibold text-[#9091FF]">10,000+</span>
                                    <p className="text-[#9091FF] text-sm opacity-70">Creators</p>
                                </div>
                                <div className="border-4 border-[#F4D9FF] rounded-xl px-6 py-4 text-center hover:bg-[#F4D9FF] cursor-pointer">
                                    <span className="text-xl font-semibold text-[#D87EF5]">50+</span>
                                    <p className="text-[#D87EF5] text-sm opacity-70">Design Styles</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Explore Section */}
                <div id="explore" className="bg-white py-4 px-6 md:px-4 lg:px-24">
                    <div className="relative w-full">
                        {/* Full-Width Image */}
                        <img
                            src="/public/Contact.jpg"
                            alt="Contact Us"
                            className="w-full h-auto rounded-2xl"
                        />
                        {/* Overlay Content */}
                        <div className="absolute inset-0 flex items-center px-10 md:px-20">
                            {/* Left Side - Title & Description */}
                            <div className="text-white max-w-lg pl-15">
                                <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
                                <p className="text-md">
                                    Have questions or need assistance? We're here to help! Reach out to us for inquiries about admissions, courses, or any other details. Our team is just a call or email away!.
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

                <hr className="border-t border-gray-300" />

                <footer className="bg-white text-black py-4 px-6 flex justify-between items-center">
                    {/* Left Side - Copyright */}
                    <p className="text-sm">&copy; {new Date().getFullYear()} DesignDeck. All rights reserved.</p>

                    {/* Right Side - Social Media Links */}
                    <div className="flex space-x-4">
                        <a href="www.github.com" className="hover:text-gray-400">
                            <i class="ri-github-line text-xl"></i>
                        </a>
                        <a href="www.twitter.com" className="hover:text-gray-400">
                            <i class="ri-twitter-x-line text-xl"></i>
                        </a>
                        <a href="www.instagram.com" className="hover:text-gray-400">
                            <i class="ri-instagram-line text-xl"></i>
                        </a>
                    </div>
                </footer>
            </div>
        </>
    );
};
export default Landingpage;
