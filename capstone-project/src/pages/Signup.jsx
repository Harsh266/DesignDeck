import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  return (
    <div className="flex items-center justify-between min-h-screen bg-white p-6 h-screen">
      {/* Left Section */}
      <div className="w-1/2 h-screen p-6">
        {/* Logo */}
        <h1 className="text-xl font-semibold mb-3">DesignDeck</h1>
        {/* Form */}
        <div className="px-16 py-6 flex flex-col justify-center w-[90%]">
          <h2 className="text-2xl font-semibold">Create Your Account</h2>
          <p className="text-gray-500 mt-1 text-[12px]">
            Let's Create an Account & Showcase Your Creativity with <span className="font-semibold">DesignDeck</span>
          </p>

          <div className="mt-5">
            <input
              type="text"
              placeholder="John Due"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-3">
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
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center mt-3">
            <input type="checkbox" className="mr-2" />
            <span className="text-[12px] text-gray-600">
              I agree to all Terms & Conditions of <span className="font-semibold">DesignDeck</span>
            </span>
          </div>

          <Link to="/signin"><button className="w-full bg-[#376CFF] text-white p-3 mt-4 rounded-md hover:bg-blue-700 transition hover:cursor-pointer">
          Create Account
          </button></Link>

          <div className="flex items-center my-2">
            <hr className="w-full border-gray-300" />
            <span className="mx-2 text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition hover:cursor-pointer ">
            <FcGoogle className="mr-2 text-[20px]" />
            Sign in with Google
          </button>

          <Link to="/signin"><p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account? <span className="text-[#376CFF] cursor-pointer hover:underline">Sign In</span>
          </p></Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-screen flex items-center justify-end p-8">
        <img
          src="./public/Signup.png" // Ensure image is in the 'public' folder
          alt="Sign in"
          className="w-[75%] h-[100%] rounded-lg"
        />
      </div>
    </div>
  );
}

export default Signup;