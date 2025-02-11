import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Import Background Image
import bgImage from "../../assets/car.png"; // Ensure this file exists in the assets folder

const UserRegister = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmpassword } = data;
    try {
      const response = await axios.post("/register", { username, email, password, confirmpassword });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({});
        toast.success("Registration Successful! Welcome! 🎉");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <>
      <Navbar />
      <div 
        className="relative flex justify-center items-center min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🚗 Create Your Account</h2>
          <form onSubmit={registerUser} className="space-y-5">

            {/* Username Field */}
            <div className="relative">
              <input 
                type="text" 
                value={data.username} 
                onChange={(e) => setData({ ...data, username: e.target.value })} 
                required 
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 hover:border-blue-400 transition"
                placeholder="Enter your username" 
              />
              <span className="absolute left-3 top-3 text-gray-500">
                <FaUser size={20} />
              </span>
            </div>

            {/* Email Field */}
            <div className="relative">
              <input 
                type="email" 
                value={data.email} 
                onChange={(e) => setData({ ...data, email: e.target.value })} 
                required 
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 hover:border-blue-400 transition"
                placeholder="Enter your email" 
              />
              <span className="absolute left-3 top-3 text-gray-500">
                <MdEmail size={20} />
              </span>
            </div>

            {/* Password Field */}
            <div className="relative">
              <input 
                type="password" 
                value={data.password} 
                onChange={(e) => setData({ ...data, password: e.target.value })} 
                required 
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 hover:border-blue-400 transition"
                placeholder="Enter your password" 
              />
              <span className="absolute left-3 top-3 text-gray-500">
                <RiLockPasswordFill size={20} />
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <input 
                type="password" 
                value={data.confirmpassword} 
                onChange={(e) => setData({ ...data, confirmpassword: e.target.value })} 
                required 
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 hover:border-blue-400 transition"
                placeholder="Confirm your password" 
              />
              <span className="absolute left-3 top-3 text-gray-500">
                <RiLockPasswordFill size={20} />
              </span>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" required />
              <span>I agree to the terms & conditions</span>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition shadow-md"
            >
              Register
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Already have an account? 
              <a href="login" className="text-blue-600 hover:underline ml-1">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
