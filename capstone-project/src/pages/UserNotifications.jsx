import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../context/ThemeContext";
import moment from "moment"; // For formatting timestamps

function UserNotifications() {
    const [notifications, setNotifications] = useState([]);
    const { theme } = useContext(ThemeContext);
    const socket = io("http://localhost:5000");

    useEffect(() => {
        // Fetch notifications from backend
        axios.get("http://localhost:5000/notifications/user-notifications")
            .then(res => setNotifications(res.data))
            .catch(err => console.error(err));

        // Listen for real-time notifications
        socket.on("newNotification", (newNotif) => {
            setNotifications(prev => [{ ...newNotif, createdAt: new Date() }, ...prev]);
        });

        return () => socket.off("newNotification");
    }, []);

    useEffect(() => {
        socket.on("connect", () => console.log("Connected to server", socket.id));
        socket.on("disconnect", () => console.log("Disconnected from server"));
    }, []);

    return (
        <>
            <Navbar />
            <div className={`min-h-screen p-5 sm:p-6 md:p-8 lg:p-10 mt-10 ${theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-black"}`}>
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center">🔔 User Notifications</h2>
                    
                    {notifications.length === 0 ? (
                        <p className="text-center mt-6 text-lg text-gray-500">No new notifications</p>
                    ) : (
                        <ul className="mt-6 space-y-4">
                            {notifications.map((notif, index) => (
                                <li key={index} className={`p-4 rounded-lg shadow-md border-l-4 transition-all ${theme === "dark" ? "bg-gray-800 border-blue-400" : "bg-white border-blue-500"}`}>
                                    <p className="text-lg font-medium">{notif.message}</p>
                                    <span className="text-sm text-gray-500">{moment(notif.createdAt).fromNow()}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserNotifications;
