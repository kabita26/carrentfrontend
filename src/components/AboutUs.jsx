import React from "react";
import Navbar from "../components/Navbar";
import FooterUI from "../components/FooterUI";
import { RiCarLine } from "react-icons/ri";
import { BiMap } from "react-icons/bi";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="main-aboutUs-div p-6 bg-gray-100 min-h-screen">
        <div className="aboutUs-main max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-2xl font-bold text-center">Your Trusted Car Rental Service!</h4>
          <p className="mt-4 text-gray-700">
            At CarRentalHub, we redefine convenience in car rentals. Our
            mission is to provide seamless, affordable, and high-quality
            vehicle rental services, ensuring you get the best experience
            whether you're traveling for business or leisure.
          </p>
          <h4 className="mt-6 text-xl font-semibold">Reliable and Affordable Rentals</h4>
          <p className="text-gray-700">
            <strong>
              We offer a wide range of vehicles, from compact cars to luxury
              SUVs, available at competitive rates with flexible rental
              durations.
            </strong>
          </p>
          <p className="text-gray-700">
            Whether you need a car for a day, a week, or an extended period,
            we ensure a smooth booking process with a variety of payment
            options. Our fleet is regularly maintained for your safety and
            comfort.
          </p>
        </div>

        <h2 className="text-center text-2xl font-bold mt-8">Our Services</h2>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md w-72 text-center">
            <div className="flex justify-center text-4xl text-blue-500">
              <RiCarLine />
            </div>
            <h5 className="text-xl font-semibold mt-4">Book Cars Online</h5>
            <p className="text-gray-600">
              Browse and rent cars effortlessly from the comfort of your home.
              We offer delivery and pickup services to major locations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-72 text-center">
            <div className="flex justify-center text-4xl text-blue-500">
              <BiMap />
            </div>
            <h5 className="text-xl font-semibold mt-4">Multiple Locations</h5>
            <p className="text-gray-600">
              Our rental services are available in multiple cities, making it
              easy for you to rent a car wherever you need.
            </p>
          </div>
        </div>
      </div>
      <FooterUI />
    </>
  );
};

export default AboutUs;