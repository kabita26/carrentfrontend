import React, { useState } from "react";
import { FaTruck, FaMinus } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { MdAdd } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { useCart } from '../Context/CartContext';

const DeliveryLocationDay = ({ car }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
 
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
 
  const handleAddToCart = (car, quantity) => {
    addToCart({ ...car, quantity });
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-1/2 mx-auto">
      <h6 className="text-xl font-semibold text-gray-800 mb-4">Get Estimated Rental Time</h6>
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <span className="text-blue-500 text-xl">
          <FaLocationDot />
        </span>
        <div className="text-gray-700">
          <h6 className="font-semibold">Kathmandu</h6>
          <p className="text-sm">Kathmandu, Nepal</p>
        </div>
        <button className="text-blue-500 text-lg">
          <PiPencilSimpleLineFill />
        </button>
      </div>
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mt-4">
        <span className="text-green-500 text-xl">
          <FaTruck />
        </span>
        <div className="text-gray-700">
          <h6 className="font-semibold">Rental Duration</h6>
          <p className="text-sm">Minimum 1 day</p>
        </div>
        <span className="text-gray-500 text-lg">
          <BsInfoCircle />
        </span>
      </div>
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mt-4">
        <h6 className="text-lg font-bold text-gray-800">Rs.{car.price} / day</h6>
        <div className="flex items-center">
          <button onClick={handleDecrement} className="px-2 py-1 bg-gray-200 rounded-lg text-lg text-gray-600">
            <FaMinus />
          </button>
          <h6 className="mx-4 text-lg">Days: {quantity}</h6>
          <button onClick={handleIncrement} className="px-2 py-1 bg-gray-200 rounded-lg text-lg text-gray-600">
            <MdAdd />
          </button>
        </div>
      </div>
      <button onClick={() => handleAddToCart(car, quantity)} className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600">
        ADD TO CART
      </button>
    </div>
  );
};

export default DeliveryLocationDay;