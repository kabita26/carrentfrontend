import React, { useEffect } from 'react';

function LeftCheckout({ 
  imageURL, 
  carName, 
  brand, 
  rentPricePerDay, 
  pickupLocation, 
  dropoffLocation, 
  pickupDate, 
  dropoffDate, 
  rentalDays, 
  setRentalDetails, 
  calculateRentalCost, 
  calculateShippingCost, 
  calculateTotalCost 
}) {
  
  // Function to calculate rental days from pickup & dropoff dates
  const calculateRentalDays = (pickupDate, dropoffDate) => {
    if (!pickupDate || !dropoffDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diffTime = end - start;
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
  };

  // Update rental days whenever pickup or dropoff date changes
  useEffect(() => {
    const newRentalDays = calculateRentalDays(pickupDate, dropoffDate);
    setRentalDetails(pickupLocation, dropoffLocation, pickupDate, dropoffDate, newRentalDays);
  }, [pickupDate, dropoffDate]);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center p-6 bg-gray-100 min-h-screen space-y-6 md:space-x-8">
      
      {/* Left Section - Car Image & Basic Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3 flex flex-col items-center text-center">
        <img 
          src={imageURL || 'https://via.placeholder.com/300'} 
          alt={`Car image for ${carName}`} 
          className="w-full h-64 object-cover rounded-md"
        />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">{carName}</h2>
        <p className="text-md text-gray-600">{brand}</p>
        <p className="text-xl font-semibold text-green-600 mt-2">Rs {rentPricePerDay}/day</p>
      </div>

      {/* Right Section - Rental Details & Pricing */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-2/3">
        
        {/* Pickup & Dropoff Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-lg font-semibold">Pickup Location:</label>
            <input 
              type="text" 
              value={pickupLocation}
              onChange={(e) => setRentalDetails(e.target.value, dropoffLocation, pickupDate, dropoffDate, rentalDays)}
              className="border p-2 rounded w-full mt-1"
              placeholder="Enter Pickup Location"
            />
          </div>

          <div>
            <label className="text-lg font-semibold">Dropoff Location:</label>
            <input 
              type="text" 
              value={dropoffLocation}
              onChange={(e) => setRentalDetails(pickupLocation, e.target.value, pickupDate, dropoffDate, rentalDays)}
              className="border p-2 rounded w-full mt-1"
              placeholder="Enter Dropoff Location"
            />
          </div>
        </div>

        {/* Pickup & Dropoff Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-lg font-semibold">Pickup Date:</label>
            <input 
              type="date" 
              value={pickupDate} 
              onChange={(e) => setRentalDetails(pickupLocation, dropoffLocation, e.target.value, dropoffDate, rentalDays)}
              className="border p-2 rounded w-full mt-1"
            />
          </div>

          <div>
            <label className="text-lg font-semibold">Dropoff Date:</label>
            <input 
              type="date" 
              value={dropoffDate} 
              onChange={(e) => setRentalDetails(pickupLocation, dropoffLocation, pickupDate, e.target.value, rentalDays)}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
        </div>

        {/* Rental Days Display */}
        <div className="mt-4">
          <label className="text-lg font-semibold">Total Rental Days:</label>
          <input 
            type="number" 
            value={rentalDays} 
            readOnly
            className="border p-2 rounded w-full mt-1 bg-gray-200"
          />
        </div>

        {/* Pricing Details */}
        <div className="mt-6 p-4 border-t">
          <h2 className="text-lg text-gray-700">
            Rental Cost: 
            <span className="font-semibold text-black ml-2">Rs {calculateRentalCost()}</span>
          </h2>
          <h2 className="text-lg text-gray-700 mt-2">
            Shipping: 
            <span className="font-semibold text-black ml-2">
              {calculateShippingCost() === 0 ? ' Free' : `Rs ${calculateShippingCost()}`}
            </span>
          </h2>
          <h2 className="text-xl font-bold text-gray-900 mt-4">
            Total: <span className="text-green-600">Rs {calculateTotalCost()}</span>
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700">
            Back
          </button>
          <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
            Proceed to Payment
          </button>
        </div>

      </div>
    </div>
  );
}

export default LeftCheckout;
