// controllers/emailController.js
const nodemailer = require("nodemailer");
require("dotenv").config();

// Controller method to handle sending emails
const sendEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                message: "Please provide name, email and message" 
            });
        }

        // Nodemailer transporter setup
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.MAIL_ID,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ 
            success: true,
            message: "Your message has been sent successfully!" 
        });
    } catch (error) {
        console.error("Email sending error:", error);
        return res.status(500).json({ 
            success: false,
            message: "Failed to send message. Please try again." 
        });
    }
};

module.exports = {
    sendEmail
};