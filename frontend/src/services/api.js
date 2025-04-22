import axios from "axios";

const api = axios.create({
    baseURL: "https://designdeck-backend-ik7d.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,  // Add this to include cookies by default
});

export default api;