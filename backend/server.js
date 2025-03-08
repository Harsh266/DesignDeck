require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sendMail = require("./config/nodemailerConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport.js");
const MongoStore = require("connect-mongo");
const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000"
];

app.use(
    cors({
        origin: allowedOrigins,
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
}).then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

// ✅ Session Configuration (For Google OAuth)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your_secret_key",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: MONGO_URI, collectionName: "sessions" }),
        cookie: { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 1000 * 60 * 60 * 24 },
    })
);
app.use(passport.initialize());
app.use(passport.session());

// ✅ Register Route
app.post("/auth/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: { name, email } });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Login Route (JWT)
app.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
        res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Google OAuth Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    const allowedPorts = [5173, 5174, 3000];
    const referer = req.headers.referer || ""; // Get the request origin

    // Extract port from referer (if available)
    const refererPort = new URL(referer)?.port || "5173"; // Default to 5173 if not found

    // Ensure port is allowed
    const redirectPort = allowedPorts.includes(Number(refererPort)) ? refererPort : "5173";

    // Redirect dynamically based on the frontend's port
    res.redirect(`http://localhost:${redirectPort}/dashboard`);
});

app.post("/auth/google", async (req, res) => {
    try {
        const { name, email, profilePicture, googleId } = req.body;
        let user = await User.findOne({ googleId });
        if (!user) {
            user = new User({ googleId, name, email, profilePicture });
            await user.save();
        }
        req.session.user = user;
        res.json({ message: "Login successful", user });
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Get Authenticated User (JWT + Google Session)
app.get("/auth/me", (req, res) => {
    if (req.session.user) {
        return res.json(req.session.user);
    }
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    });
});

// ✅ Logout Route
app.post("/auth/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
    req.session.destroy();
    res.status(200).json({ message: "Logged out successfully" });
});

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("🚀 Backend is running & MongoDB connected!");
});

app.post('/resetpassword', async (req, res) => {
    const { email } = req.body;
    console.log(req.body);

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // ✅ Generate JWT Token (expires in 1 hour)
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });


    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Create password reset URL
    const resetUrl = `http://localhost:5173/changepasswordwithtoken/${resetToken}`;

    // Send email
    try {
        await sendMail(email, "Password Reset", `Click the link to reset your password: ${resetUrl}`);
        res.status(200).json({ message: "Password reset email sent", token: resetToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
    }
});

app.post('/changepasswordwithtoken', async (req, res) => {
    const { password, token } = req.body;

    if (!password || !token) {
        return res.status(400).json({ message: "Password is required" });
    }
    try {
        // ✅ Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.resetPasswordToken !== token || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // ✅ Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // ✅ Clear reset fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Invalid or expired token" });
    }
});
// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
