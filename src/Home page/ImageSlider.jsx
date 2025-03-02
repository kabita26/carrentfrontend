import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/assets/sidebar.png",
      heading: "Drive Your Dream Car",
      paragraph: "Discover the best cars available for rent at unbeatable prices!",
    },
    {
      image: "/assets/sidebar.png",
      heading: "Luxury & Comfort",
      paragraph: "Experience top-tier luxury cars with best-in-class services.",
    },
    {
      image: "/assets/sidebar.png",
      heading: "Adventure Awaits",
      paragraph: "Explore new destinations with our premium car rental services.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative flex flex-col justify-center items-center text-center text-white h-full px-8">
        <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{slides[currentSlide].heading}</h2>
        <p className="mt-4 text-lg md:text-xl max-w-xl">{slides[currentSlide].paragraph}</p>

        {/* Navigation Buttons */}
        <div className="absolute w-full flex justify-between top-1/2 transform -translate-y-1/2 px-6">
          <button
            onClick={prevSlide}
            className="p-3 bg-gray-900/50 rounded-full text-white text-3xl hover:bg-gray-900 transition"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 bg-gray-900/50 rounded-full text-white text-3xl hover:bg-gray-900 transition"
          >
            <IoIosArrowForward />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-white" : "bg-gray-500"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
