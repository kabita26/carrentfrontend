import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoHeart } from "react-icons/io5";
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast';

const CarCards = ({ headline, cars }) => {
  const [visibleCars, setVisibleCars] = useState(3);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isCarInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSeeMore = () => setVisibleCars((prev) => prev + 3);

  const handleAddToCart = (car) => {
    if (user) {
      addToCart(car);
      toast.success('Added to cart');
    } else {
      toast.error('Login to add items to cart');
    }
  };

  const handleWishlistToggle = (car) => {
    if (isCarInWishlist(car)) {
      removeFromWishlist(car);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(car);
      toast.success('Added to wishlist');
    }
  };

  const handleBookCar = (carId) => {
    navigate(`/book-car/${carId}`);
  };

  if (!Array.isArray(cars) || cars.length === 0) {
    return <p className="text-center text-gray-600">No cars available.</p>;
  }

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{headline}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.slice(0, visibleCars).map((car) => (
          <div key={car._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/carlisting/${car._id}`} className="block">
              <img src={car.imageURL || 'https://via.placeholder.com/150'} alt={car.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
                <p className="text-sm text-gray-600"><strong>Brand:</strong> {car.brand}</p>
                <p className="text-sm text-gray-600"><strong>Price:</strong> Rs {car.price}</p>
              </div>
            </Link>
            <div className="flex justify-between items-center p-4 border-t">
              <button onClick={() => handleAddToCart(car)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Add to Cart
              </button>
              <button onClick={() => handleWishlistToggle(car)} className="text-red-500 text-2xl">
                <IoHeart className={isCarInWishlist(car) ? 'fill-current text-red-600' : 'text-gray-300'} />
              </button>
              <button onClick={() => handleBookCar(car._id)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleCars < cars.length && (
        <div className="text-center mt-6">
          <button onClick={handleSeeMore} className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800">
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default CarCards;
