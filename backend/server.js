const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables



const app = express();

// ✅ MongoDB Connection URI (from .env or local fallback)
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://harshvekriya441:Harsh123@capstone-project.mfd59.mongodb.net";

// ✅ Connect to MongoDB
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const allowedOrigins = ["http://localhost:5173", "http://localhost:5137"];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // Allow cookies & auth headers
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("✅ Backend server is running... MongoDB is connected!");
});

// ✅ Example API Route
app.get("/api/test", (req, res) => {
    res.json({ message: "✅ API is working!" });
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
