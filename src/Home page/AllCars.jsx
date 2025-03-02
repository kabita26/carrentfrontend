import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IoHeart } from "react-icons/io5";
import { useWishlist } from '../Context/WishlistContext';
import { useCheckout } from '../Context/CheckoutContext';

const AllCars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isCarInWishlist } = useWishlist();
  const { setCheckoutData } = useCheckout(); // Import Checkout Context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/carlisting');
        setCars(response.data.cars || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleWishlistToggle = (car) => {
    if (isCarInWishlist(car)) {
      removeFromWishlist(car);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(car);
      toast.success('Added to wishlist');
    }
  };

  const handleBookCar = (car) => {
    // Set Checkout Data before redirecting
    setCheckoutData(car.imageUrls?.[0] || '', car.name, car.brand, car.regularPrice);
    navigate('/checkout'); // Redirect to Checkout page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Car Listings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(cars) && cars.length > 0 ? (
          cars.map((car) => (
            <div 
              key={car._id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              {/* Image & Wishlist Button */}
              <div className="relative">
                <img 
                  src={car.imageUrls?.[0] || 'https://via.placeholder.com/150'} 
                  alt={car.name} 
                  className="w-full h-48 object-cover"
                />
                <button 
                  className="absolute top-2 right-2 text-2xl text-red-500"
                  onClick={() => handleWishlistToggle(car)}
                >
                  <IoHeart className={isCarInWishlist(car) ? 'fill-current text-red-600' : 'text-gray-300'} />
                </button>
              </div>

              {/* Car Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
                <p className="text-sm text-gray-600"><strong>Brand:</strong> {car.brand}</p>
                <p className="text-sm text-gray-600"><strong>Model:</strong> {car.model}</p>
                <p className="text-sm text-gray-600"><strong>Year:</strong> {car.year}</p>
                <p className="text-sm text-gray-600"><strong>Price:</strong> ${car.regularPrice}</p>
              </div>

              {/* Book Now Button */}
              <div className="flex justify-center p-4 border-t border-gray-200">
                <button
                  onClick={() => handleBookCar(car)}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center w-full col-span-4">No cars available.</p>
        )}
      </div>
    </div>
  );
};

export default AllCars;
