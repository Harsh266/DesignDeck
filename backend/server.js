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
const server = http.createServer(app); // Use HTTP server instance

// ✅ CORS Configuration
const allowedOrigins = [
    "http://localhost:5173" // Local Development
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS policy does not allow this origin"), false);
            }
        },
        credentials: true, // Allow cookies
    })
);

// ✅ WebSocket Configuration
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});

// ✅ WebSocket Events
io.on("connection", (socket) => {
    console.log("🔗 New client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
    });
});

// ✅ Middleware Setup
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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

// ✅ Session Configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your-secret-key",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: MONGO_URI,
            collectionName: "sessions",
        }),
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use HTTPS in production
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/auth", googleAuthRoutes);
app.use("/auth", passwordResetRoutes);
app.use("/auth", updateProfileRoutes);
app.use("/api/contact", contactRoutes);
app.use("/notifications", notificationRoutes);

// ✅ Static File Serving
app.use("/uploads/profileImages", express.static(path.join(__dirname, "uploads/profileImages")));
app.use("/uploads/coverImages", express.static(path.join(__dirname, "uploads/coverImages")));

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("🚀 Backend is running & MongoDB connected!");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
