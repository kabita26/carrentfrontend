import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminSideBar from './AdminSideBar';

const UploadCar = () => {
  const [data, setData] = useState({
    name: '',
    brand: '',
    model: '',
    year: '',
    fuelType: '',
    carManufacturer: '',
    description: '',
    address: '',
    regularPrice: '',
    discountPrice: '',
    offer: '',
    parking: '',
    type: '',
    driveType: '',
    seatingCapacity: '',
    imageUrls: []
  });

  // Options for dropdown fields
  const dropdownOptions = {
    brand: ['Toyota', 'Honda', 'Ford', 'BMW', 'Audi'],
    fuelType: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    type: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
    driveType: ['FWD', 'RWD', 'AWD', '4WD'],
    carManufacturer: ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes'],
  };

  const CarUpload = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.post('/upload-car', data);
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({
          name: '',
          brand: '',
          model: '',
          year: '',
          fuelType: '',
          carManufacturer: '',
          description: '',
          address: '',
          regularPrice: '',
          discountPrice: '',
          offer: '',
          parking: '',
          type: '',
          driveType: '',
          seatingCapacity: '',
          imageUrls: []
        });
        toast.success('Car Uploaded Successfully');
      }
    } catch (error) {
      console.error('Error uploading car:', error);
      toast.error('Failed to upload car. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="max-w-5xl mx-auto bg-white p-10 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🚗 Upload a New Car</h2>

          <form onSubmit={CarUpload} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(data).map((key) => (
              <div key={key} className="col-span-1">
                <label className="block text-gray-700 font-semibold capitalize mb-2">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                {dropdownOptions.hasOwnProperty(key) ? (
                  <select
                    value={data[key]}
                    onChange={(e) => setData({ ...data, [key]: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 hover:border-blue-400 transition"
                    required
                  >
                    <option value="">{`Select ${key}`}</option>
                    {dropdownOptions[key].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : key === 'imageUrls' ? (
                  <input
                    type="text"
                    placeholder="Enter image URL (comma separated)"
                    value={data[key]}
                    onChange={(e) => setData({ ...data, [key]: e.target.value.split(',') })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 hover:border-blue-400 transition"
                    required
                  />
                ) : (
                  <input
                    type="text"
                    value={data[key]}
                    onChange={(e) => setData({ ...data, [key]: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 hover:border-blue-400 transition"
                    required
                  />
                )}
              </div>
            ))}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                🚀 Submit Car
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UploadCar;
