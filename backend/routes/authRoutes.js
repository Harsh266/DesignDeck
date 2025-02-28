//User routes
const express = require("express");
const router = express.Router(); // ✅ FIXED: Define router

router.post("/google", async (req, res) => {
    try {
        const { tokenId } = req.body;

        // Verify Google Token
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { name, email, picture } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ name, email, avatar: picture });
            await user.save();
        }

        // Generate JWT Token
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token: jwtToken, user });

    } catch (error) {
        console.error("Google login error:", error);
        res.status(500).json({ message: "Google authentication failed" });
    }
});

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ token, user });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Signup failed" });
    }
});


// Export the router
module.exports = router;
