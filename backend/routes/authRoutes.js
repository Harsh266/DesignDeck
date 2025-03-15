const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ Register Route
router.post("/register", async (req, res) => {
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

// ✅ Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
        res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Get Authenticated User Route
router.get("/me", async (req, res) => {
    try {
        if (req.session?.user) {
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
    } catch (error) {
        console.error("User Fetch Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ✅ Logout Route
router.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });

    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Logout Error:", err);
                return res.status(500).json({ message: "Logout failed" });
            }
        });
    }

    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
