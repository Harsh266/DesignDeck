import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdDoneAll } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../context/ThemeContext";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(<span className="flex items-center gap-2 text-blue-500">Processing request...</span>);

        try {
            const response = await fetch("http://localhost:5000/auth/resetpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(
                    <span className="flex items-center gap-2 text-[#00B70F]">
                        <IoMdDoneAll className="text-2xl" /> Reset password link sent
                    </span>
                );
                setTimeout(() => navigate(`/signin`), 3000);
            } else {
                setMessage(
                    <span className="flex items-center gap-2 text-red-500">
                        <IoClose className="text-2xl" /> {data.message || "Something went wrong"}
                    </span>
                );
            }
        } catch (error) {
            setMessage(
                <span className="flex items-center gap-2 text-red-500">
                    <IoClose className="text-2xl" /> Failed to send request. Please try again.
                </span>
            );
        }
    };

    return (
        <>
            <Helmet>
                <title>DesignDeck - Reset Password</title>
            </Helmet>

            <div
                className={`flex flex-col lg:flex-row items-center justify-center min-h-screen h-screen overflow-hidden ${
                    theme === "dark" ? "bg-black text-white" : "bg-white text-black"
                }`}
            >
                {/* Left Section */}
                <div className="w-full lg:w-1/2 h-full p-6 flex flex-col justify-center items-center">
                    <h1 className="text-xl font-semibold absolute top-7 left-10 lg:static">DesignDeck</h1>

                    <div className="w-full max-w-md px-4 sm:px-6">
                        <div className="flex justify-center mb-4">
                            <div
                                className={`h-12 w-12 flex items-center justify-center rounded-lg border ${
                                    theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
                                }`}
                            >
                                <i className={`ri-mail-open-line text-2xl ${theme === "dark" ? "text-gray-300" : "text-black"}`}></i>
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold text-center">Forgot Password?</h2>
                        <p className={`text-center mt-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            No worries, we’ll send you reset instructions.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`border p-3 rounded w-full mt-1 focus:outline-none focus:ring-2 ${
                                        theme === "dark"
                                            ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-400"
                                            : "border-gray-300 bg-white text-black focus:ring-blue-500"
                                    }`}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className={`p-3 rounded w-full cursor-pointer ${
                                    theme === "dark" ? "bg-blue-500 text-white" : "bg-[#376CFF] text-white"
                                }`}
                            >
                                Send Link
                            </button>
                        </form>

                        {message && <p className="mt-4 text-center flex justify-center items-center">{message}</p>}

                        <a href="/signin" className={`mt-4 flex items-center justify-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            ← Back to login
                        </a>
                    </div>
                </div>

                {/* Right Section - Image (Visible Only on Large Screens) */}
                <div className="hidden lg:flex w-1/2 h-full items-center justify-end p-8">
                    <img src="/forgotpassword.png" alt="forgot password" className="w-[85%] h-[100%] rounded-lg" />
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
