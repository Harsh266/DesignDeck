require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport.js");
const MongoStore = require("connect-mongo");
// Routes
const authRoutes = require("./routes/authRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");
const passwordResetRoutes = require("./routes/passwordResetRoutes");
const updateProfileRoutes = require("./routes/updateProfileRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
                callback(null, true); // ✅ Allow any localhost port
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);


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

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("🚀 Backend is running & MongoDB connected!");
});
app.use("/uploads/profileImages", express.static(path.join(__dirname, "uploads/profileImages")));
app.use("/uploads/coverImages", express.static(path.join(__dirname, "uploads/coverImages")));


// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
