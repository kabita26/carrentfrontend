import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import khalti from "../images/khalti.png";
import cashOnDelivery from "../images/cashOnDelivery.png";

const FooterUI = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* 📍 Physical Location */}
        <div>
          <h5 className="text-xl font-semibold mb-4">Physical Location</h5>
          <p className="flex items-center justify-center md:justify-start text-gray-400">
            <FaMapMarkerAlt className="mr-2 text-blue-400" /> Currently Unavailable
          </p>
        </div>

        {/* 🚗 Popular Car Brands */}
        <div>
          <h5 className="text-xl font-semibold mb-4">Popular Car Brands</h5>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Toyota</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Honda</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Ford</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Tesla</a></li>
          </ul>
        </div>

        {/* 📞 Support */}
        <div>
          <h5 className="text-xl font-semibold mb-4">Support</h5>
          <p className="flex items-center justify-center md:justify-start text-gray-400">
            <FaPhone className="mr-2 text-green-400" /> 01-890786
          </p>
          <p className="flex items-center justify-center md:justify-start text-gray-400 mt-2">
            <FaEnvelope className="mr-2 text-red-400" /> carhubnepal@gmail.com
          </p>
        </div>

        {/* ℹ️ About */}
        <div>
          <h5 className="text-xl font-semibold mb-4">About</h5>
          <NavLink to="/AboutUs" className="text-gray-400 hover:text-blue-400 transition">
            About Us
          </NavLink>
        </div>
      </div>

      {/* 💳 Payment Options & Social Links */}
      <div className="container mx-auto px-6 mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
        
        {/* 💰 Payment Methods */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <h6 className="text-lg font-semibold">Payment Options:</h6>
          <img src={khalti} alt="Khalti" className="h-12 w-auto object-contain hover:scale-110 transition-transform" />
          <img src={cashOnDelivery} alt="Cash on Delivery" className="h-12 w-auto object-contain hover:scale-110 transition-transform" />
        </div>

        {/* 📲 Social Media Links */}
        <div className="flex space-x-6 mt-6 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-blue-500 text-2xl transition">
            <FaFacebook />
          </a>
          <a href="#" className="text-gray-400 hover:text-pink-500 text-2xl transition">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-300 text-2xl transition">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* © Copyright */}
      <div className="text-center text-gray-500 mt-6">
        <p>&copy; {new Date().getFullYear()} CarHub Nepal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterUI;
