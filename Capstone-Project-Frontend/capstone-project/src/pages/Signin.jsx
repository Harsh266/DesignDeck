import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Signin = () => {
    return (
        <div className="flex items-center justify-between min-h-screen bg-white p-6 h-screen">
            {/* Left Section */}
            <div className="w-1/2 h-screen p-6 flex flex-col justify-center">
                {/* Logo */}
                <h1 className="text-xl font-semibold mb-10">DesignDeck</h1>
                {/* Form */}
                <div className="px-16 py-6 flex flex-col justify-center w-[90%]">
                    <h2 className="text-2xl font-bold">Welcome Back</h2>
                    <p className="text-gray-500 mt-1">
                        Sign in to Showcase, Inspire, and Elevate Your Creativity!
                    </p>

                    <div className="mt-5">
                        <input
                            type="email"
                            placeholder="xyz@abc.com"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mt-3">
                        <input
                            type="password"
                            placeholder="XXXXXXXXXXXXXXXXXX"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>

                    <Link to="/resetpassword"><div className="text-right text-black text-sm mt-2 cursor-pointer underline">
                        Forgot Password?
                    </div></Link>

                    <Link to="/dashboard"><button className="w-full bg-[#376CFF] text-white p-3 mt-4 rounded-md hover:bg-blue-700 transition hover:cursor-pointer">
                        Sign In
                    </button></Link>

                    <div className="flex items-center my-4">
                        <hr className="w-full border-gray-300" />
                        <span className="mx-2 text-gray-500">or</span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    <button className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition hover:cursor-pointer ">
                    <FcGoogle className="mr-2 text-[20px]"/>
                        Sign in with Google
                    </button>

                    <Link to="/signup"><p className="text-sm text-gray-600 mt-4 text-center">
                        Are you new? <span className="text-[#376CFF] cursor-pointer hover:underline">Create An Account</span>
                    </p></Link>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 h-screen flex items-center justify-end p-8">
                <img
                    src="./public/Signin.png" // Ensure image is in the 'public' folder
                    alt="Sign in"
                    className="w-[85%] h-[100%] rounded-lg"
                />
            </div>
        </div>
    );
}

export default Signin;