import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Home } from "./Home page/Home";

import UserLogin from "./Auth/UserLogin";
import UserRegister from "./Auth/UserRegister";
import UserForgotPassword from "./Auth/UserForgotPassword";
import UserResetPassword from "./Auth/UserResetPasspord"; // Fixed typo in filename
import CarDetail from "./components/CarDetail";
import Categories from "./components/Categories";
import AboutUs from "./components/AboutUs";
import AuthorName from "./components/AuthorName";
import Wishlist from "./components/Wishlist";
import ShoppingCart from "./components/shoppingCart";
import Checkout from "./checkout/Checkout";
import Payment from "./checkout/Payment";

import AdminApp from "./Admin/AdminApp";
import AdminCarUpload from "./Admin/AdminCarUpload"; 
import AdminManageCar from "./Admin/AdminManageCar"; // Added missing import
import AdminCarDetail from "./Admin/AdminCarDetail"; // Added missing import
import UserDetail from "./components/UserDetail";
import CarRentalAdmin from "./Admin/AdminSales";
import Brands from "./Home page/Brands";
import Carcards from "./components/Carcards";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/forgotpassword" element={<UserForgotPassword />} />
        <Route path="/resetpassword/:id" element={<UserResetPassword />} />
        <Route path="/category/:category" element={<Categories />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/author/:authorName" element={<AuthorName />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/carlisting" element={<Carcards />} />

        {/* Car Listing Routes */}
        <Route path="/carlisting" element={<AdminCarDetail />} />
        <Route path="/update-car/:id" element={<AdminManageCar />} />  

        <Route path="/carlisting/:id" element={<CarDetail />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminApp />} />
        <Route path="/customers" element={<CarRentalAdmin />} />
        

        <Route path="/upload-car" element={<AdminCarUpload />} />
      </Routes>
    </>
  );
};

export default App;
