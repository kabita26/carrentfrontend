import React from "react";

import Navbar from "../components/Navbar";
import FooterUI from "../components/FooterUI";
import ImageSlider from "../Home page/ImageSlider";
import Brands from "./Brands";
import AllCars from "./AllCars";
import NewArrivals from "../Home page/NewArrivals";
import Author from "../Home page/Author";


export const Home = () => {
  return (
    <>
        <Navbar />
      <ImageSlider />
      <Brands />
      <AllCars/>
      {/* <NewArrivals /> */}
      {/* <Author /> */}
      <FooterUI/>
    </>
  );
};

export default Home;
