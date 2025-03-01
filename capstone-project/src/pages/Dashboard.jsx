import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const categories = ["Explore", "UI/UX", "Poster", "Logo Design", "App Design"];
    const [activeCategory, setActiveCategory] = useState("Explore");

    const cards = [
        { title: "Portfolio / Animation", user: "Unknown User", media: "https://cdn.dribbble.com/userupload/14090638/file/original-8bb2193fbab4f9b1cac096f86b611e99.mp4", type: "video", thumbnail: "https://cdn.dribbble.com/userupload/14090637/file/still-f1c0df70f1c15486b88334c0bda65b61.png?format=webp&resize=450x338&vertical=center", userImage: "https://randomuser.me/api/portraits/men/3.jpg" },
        { title: "Tecnology Mobile App UI Design", user: "Unknown User", media: "https://cdn.dribbble.com/userupload/36060013/file/original-2aa7a89ad7453a979c3e096fb73a9be7.jpeg?resize=1200x900&vertical=center", type: "image", userImage: "https://randomuser.me/api/portraits/women/2.jpg" },
        { title: "AIR1-07", user: "Unknown User", media: "https://cdn.dribbble.com/userupload/36368152/file/original-f2d9372b4ed87813ef10eea93953b31d.mp4", type: "video", thumbnail: "https://cdn.dribbble.com/userupload/36368151/file/still-0ae21d5de367235c8618fb3acfa5c2cc.png?format=webp&resize=450x338&vertical=center", userImage: "https://randomuser.me/api/portraits/men/3.jpg" },
        { title: "Perchi Logo Design", user: "Unknown User", media: "https://cdn.dribbble.com/userupload/36162633/file/original-e8e53f0e5656a06b27050423d21ffaee.jpg?resize=1200x900&vertical=center", type: "image", userImage: "https://randomuser.me/api/portraits/women/4.jpg" },
        { title: "CGPT Tap Game — Explainer Video", user: "Unknown User", media: "https://cdn.dribbble.com/userupload/16763108/file/original-4c38aa030b4337fbb5d1114efa245e34.mp4", type: "video", thumbnail: "https://cdn.dribbble.com/userupload/16763107/file/still-3de5994da3cac2d4170eb51b7c0bb6b1.png?format=webp&resize=450x338&vertical=center", userImage: "https://randomuser.me/api/portraits/men/3.jpg" },
        { title: "Music Festival", user: "Unknown User", media: "https://cdn.dribbble.com/userupload/36238146/file/original-00f3a3bb4248a233f7c5b9ac092f4d2c.jpg?resize=1200x1434&vertical=center", type: "image", userImage: "https://randomuser.me/api/portraits/women/6.jpg" }
    ];

    return (
        <>
            <Navbar />
            <div className="p-6 max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="relative text-center py-16">
                    <h1 className="text-4xl font-semibold">
                        Discover the world’s <br /> <span className="text-black">top designers</span>
                    </h1>
                    <p className="font-regular mt-6">
                        Explore work from the most talented and accomplished designers <br /> ready to take on your next project
                    </p>
                    <div className="mt-6 flex items-center justify-center">
                        <div className="flex items-center bg-[#DCE6FF] px-4 py-2 rounded-full w-150">
                            <input
                                type="text"
                                placeholder="Find your inspiration"
                                className="w-full bg-transparent outline-none text-gray-700 px-2"
                            />
                            <button className="bg-[#9091FF] rounded-full px-3 py-2">
                                <i className="ri-search-line text-white"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Categories */}
                <div className="flex justify-center mt-6 gap-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "bg-purple-200 text-purple-600" : "text-gray-600"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Image & Video Grid */}
                <Link to="/view"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {cards.map((card, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-xl overflow-hidden group cursor-pointer transition-all "
                        >
                            {/* Media Handling */}
                            <div className="relative w-full h-60 rounded-xl overflow-hidden">
                                {card.type === "video" ? (
                                    <>
                                        {/* Show Image by Default */}
                                        <img 
                                            src={card.thumbnail || "/default-thumbnail.jpg"} 
                                            alt={card.title} 
                                            className="w-full h-full object-cover rounded-xl group-hover:hidden"
                                        />
                                        {/* Show Video on Hover */}
                                        <video 
                                            className="w-full h-full object-cover rounded-xl hidden group-hover:block"
                                            autoPlay 
                                            loop 
                                            muted 
                                            playsInline
                                        >
                                            <source src={card.media} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </>
                                ) : (
                                    <img 
                                        src={card.media} 
                                        alt={card.title} 
                                        className="w-full h-full object-cover rounded-xl" 
                                    />
                                )}
                            </div>

                            {/* User Info at Bottom */}
                            <div className="py-2 flex items-center gap-3">
                                <img
                                    src={card.userImage}  
                                    alt={card.user}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex flex-col">
                                    <h2 className="font-semibold text-base">{card.title}</h2>
                                    <p className="text-gray-500 text-sm">{card.user}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div></Link>

                {/* Load More Button */}
                <div className="flex justify-center mt-6">
                    <button className="px-6 py-2 bg-purple-200 text-purple-600 rounded-full font-medium cursor-pointer">Load More</button>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
