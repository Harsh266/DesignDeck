require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport.js");
const MongoStore = require("connect-mongo");
const http = require("http");
const { Server } = require("socket.io");
// Routes
const authRoutes = require("./routes/authRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");
const passwordResetRoutes = require("./routes/passwordResetRoutes");
const updateProfileRoutes = require("./routes/updateProfileRoutes");
const contactRoutes = require("./routes/contactRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration
import cors from "cors";

const allowedOrigins = [
    "http://localhost:3000",  // ✅ Local Development
    "https://designdeck-frontend.onrender.com" // ✅ Corrected (Removed Trailing Slash)
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true); // ✅ Allow request
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // ✅ Required if using cookies
    })
);


app.use((req, res, next) => {
    req.io = io; // Attach Socket.io to request
    next();
});

io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
    });
});

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ MongoDB URI is missing in .env file");
    process.exit(1);
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// ✅ Session Configuration (For Google OAuth)
app.use(
    session({
        secret: "your-secret-key",  // Change this to a secure random string
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: "sessions",
        }),
        cookie: {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
// ✅ Routes
app.use("/auth", authRoutes);
app.use("/auth", googleAuthRoutes);
app.use("/auth", passwordResetRoutes);
app.use('/auth', updateProfileRoutes) // ✅ Password Reset Routes
app.use("/api/contact", contactRoutes);
app.use("/notifications", notificationRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("🚀 Backend is running & MongoDB connected!");
});
app.use("/uploads/profileImages", express.static(path.join(__dirname, "uploads/profileImages")));
app.use("/uploads/coverImages", express.static(path.join(__dirname, "uploads/coverImages")));


// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
