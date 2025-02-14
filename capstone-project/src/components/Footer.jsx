import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi"
import { FaBehance } from "react-icons/fa";

const Footer =() => {
    return (
        <>
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

export default Footer;