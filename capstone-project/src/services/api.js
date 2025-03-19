import axios from "axios";

const API_URL = "https://designdeck-backend.onrender.com/";

export const getMessage = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching message", error);
    }
};
