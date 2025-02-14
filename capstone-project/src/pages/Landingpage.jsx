import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi"
import { FaBehance } from "react-icons/fa";


const Landingpage = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <nav className="w-full bg-gray-100 shadow-md py-4 px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
                    <h1 className="text-2xl font-semibold">DesignDeck</h1>

                    <div className="hidden md:flex space-x-8 text-lg font-medium">
                        <a href="#home" className="relative group transition-all duration-300">
                            Home
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="#about" className="relative group transition-all duration-300">
                            About
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="#features" className="relative group transition-all duration-300">
                            Features
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="#explore" className="relative group transition-all duration-300">
                            Explore
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="#integration" className="relative group transition-all duration-300">
                            Integration
                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </div>

                    < button className="border border-black  border-2 rounded-md px-5 py-2 text-sm font-semibold transition duration-300 hover:bg-black hover:text-white hover:cursor-pointer"><Link to="/signin">
                        Login
                    </Link>
                    </button>
                </nav>

                <div id="home" className="flex flex-col items-center justify-center flex-grow text-center px-4 mt-12">
                    <p className="text-gray-600 text-lg">
                        Your creativity deserves the perfect stage—welcome to DesignDeck
                    </p>
                    <h2 className="text-4xl font-bold mt-4 leading-tight">
                        Your Designs, Your Code, Your Platform
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-semibold mt-2">
                        The Ultimate Creative Hub
                    </h3>
                    <button className="mt-6 px-6 py-3 bg-black text-white rounded-full text-lg hover:cursor-pointer">
                        <Link to="/signup">
                            Get started for free
                        </Link>
                    </button>
                </div>
            </div>

            <section id="about" className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-16 h-screen">
                <div className="md:w-1/2 text-left">
                    <h3 className="text-[20px] font-regular text-black">DesignDeck</h3>
                    <h1 className="text-3xl font-semibold text-black mt-2 leading-tight">
                        Next-Generation Design <br /> & Code Showcase
                    </h1>
                    <p className="text-lg font-semibold text-black mt-4">
                        Don’t just create, elevate your creativity!
                    </p>
                    <p className="text-gray-600 text-lg mt-4">
                        DesignDeck is a cutting-edge design and development showcase platform
                        where creators, developers, and designers can upload, preview, and
                        share their work seamlessly. With real-time code previews, media
                        uploads, and an interactive community.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-300 transition hover:cursor-pointer">
                        Try it free
                    </button>
                </div>

                <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                    <div className="w-full max-w-lg h-80 bg-gray-300 rounded-xl shadow-lg"></div>
                </div>
            </section>

            <div id="features" className="div h-screen w-full flex items-end justify-center p-[15px]  ">
                <section className="h-fit flex w-fit flex-col justify-center items-center text-center overflow-hidden ">
                    <h2 className="text-2xl font-semibold text-black">Explore the Power of DesignDeck</h2>
                    <p className="text-gray-600 text-md mt-0 max-w-2xl">
                        DesignDeck is a powerful platform to showcase your designs, upload code, share visuals,
                        and connect with a vibrant creative community.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 max-w-6xl  p-2">
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-95">
                            <div className="w-full h-50 bg-gray-300"></div> 
                            <div className="p-4 text-left flex-grow mb-2">
                                <h3 className="text-lg font-semibold">Image & Video Upload</h3>
                                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2 text-sm">
                                    <li>Upload high-quality images & videos easily.</li>
                                    <li>Supports multiple formats with fast loading.</li>
                                    <li>Embed images & videos directly in your projects.</li>
                                    <li>Secure cloud storage for safe keeping.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-95">
                            <div className="w-full h-50 bg-gray-300"></div>
                            <div className="px-4  text-left flex-grow mb-2">
                                <h3 className="text-lg font-semibold pt-3.5">Live Preview</h3>
                                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2 text-sm">
                                    <li>Instantly preview HTML, CSS, and JS code in real time.</li>
                                    <li>No need to refresh—changes update instantly.</li>
                                    <li>Code collaboration with instant previews.</li>
                                    <li>Test animations and interactions instantly.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-95">
                            <div className="w-full h-50 bg-gray-300"></div>
                            <div className="px-4 text-left flex-grow mb-2">
                                <h3 className="text-lg font-semibold pt-3.5">Future of DesignDeck</h3>
                                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2 text-sm">
                                    <li>AI-powered design insights for better creativity.</li>
                                    <li>Smart suggestions for improving code & designs.</li>
                                    <li>Advanced collaboration features for teams.</li>
                                    <li>Continuous updates & feature expansions.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section id="explore" className="h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 text-left">
                <div className="w-[55%] space-y-5">
                    <h2 className="text-3xl md:text-4xl font-semibold text-black">What is DesignDeck?</h2>
                    <p className="text-gray-600 text-[16px] leading-relaxed pr-[80px] text-justify">
                        DesignDeck is a next-generation creative platform designed for designers,
                        developers, and creative professionals to showcase, code, and share their work seamlessly.
                        It provides a powerful and intuitive space where users can upload, edit,
                        and preview their HTML, CSS, and JavaScript code in real-time.
                    </p>
                    <button className="bg-black text-white px-4 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ease-in-out group w-68 hover:w-75 hover:cursor-pointer">
                        <span className="whitespace-nowrap">Learn more about DesignDeck</span>
                        <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300 ease-in-out">
                            <FaArrowRight />
                        </span>
                    </button>
                </div>
                <div className="w-[45%] flex justify-center mt-6 md:mt-0">
                    <div className="w-full md:w-[450px] h-[280px] bg-gray-200 rounded-lg"></div>
                </div>
            </section>

            <section id="integration" className="h-screen flex justify-center items-center px-10">
                <div className="w-[500px] h-[300px] bg-gray-200 rounded-lg"></div>

                <div className="max-w-lg ml-10">
                    <p className="text-lg font-semibold text-gray-700">
                        DesignDeck where you create
                    </p>
                    <h2 className="text-3xl font-bold mt-2 leading-snug">
                        Seamless Integration with <br /> Your Design Workflow
                    </h2>
                    <p className="text-gray-600 mt-4">
                        DesignDeck connects with popular design and development tools, making it
                        easy to streamline your creative process. Whether you're a designer,
                        developer, or content creator, our integrations help you collaborate,
                        manage, and enhance your projects effortlessly.
                    </p>
                </div>
            </section>

            <section className="w-full min-h-screen flex justify-center items-center bg-white px-6">
                <div className="w-full max-w-4xl flex items-center justify-between bg-gray-100 p-10 rounded-lg">
                    <div className="max-w-md text-left">
                        <h2 className="text-3xl font-semibold leading-tight">
                            Showcase and Preview <br /> Your Designs for Free
                        </h2>
                        <p className="text-gray-700 mt-2">
                            Showcase your creativity with DesignDeck – <br /> code, share, and preview instantly!
                        </p>
                        <button className="mt-4 bg-black text-white py-2 px-4 rounded-md text-sm hover:bg-gray-900 cursor-pointer">
                            Get Started
                        </button>
                    </div>

                    <div className="w-[300px] h-[200px] bg-gray-300 rounded-lg"></div>
                </div>
            </section>

            <footer className="w-full bg-gray-100 py-10 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-5 gap-10">
                    <div className="col-span-2 space-y-4">
                        <h3 className="text-2xl font-bold">DesignDeck</h3>
                        <p className="text-gray-600 text-lg leading-relaxed  pr-16">
                            DesignDeck allows users to create profiles and upload HTML, CSS, and JS code separately,
                            while also supporting image and video uploads.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Explore</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li><a href="#" className="hover:text-black">Home</a></li>
                            <li><a href="#" className="hover:text-black">Profile</a></li>
                            <li><a href="#" className="hover:text-black">Dashboard</a></li>
                            <li><a href="#" className="hover:text-black">Projects</a></li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Legal</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li><a href="#" className="hover:text-black">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-black">Cookies Policy</a></li>
                            <Link to="/contactus"><li><a href="#" className="hover:text-black">Contact Us</a></li></Link>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Follow us</h3>
                        <div className="flex gap-4 mt-1">
                            <a href="#" className="text-black hover:text-gray-700 text-[23px]">
                                <FaInstagram />
                            </a>
                            <a href="#" className="text-black hover:text-gray-700 text-[23px]">
                                <FiGithub />
                            </a>
                            <a href="#" className="text-black hover:text-gray-700 text-[23px]">
                                <FaBehance />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center text-gray-600 mt-10">
                    © 2025 DesignDeck. Your Designs, Your Code, Your Platform
                </div>
            </footer>
        </>
    );
};
export default Landingpage;
