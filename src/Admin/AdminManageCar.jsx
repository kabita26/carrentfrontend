import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/carlisting/${id}`);
        if (response.data) {
          setData(response.data);
        } else {
          toast.error('Car not found');
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
        toast.error('Failed to fetch car details.');
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/car_update/${id}`, data);
      toast.success('Car Updated Successfully');
      navigate('/carlisting'); // Redirect after update
    } catch (error) {
      console.error('Error updating car:', error);
      toast.error('Failed to update car.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Update Car Details</h2>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Name */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Car Name</label>
            <input type="text" name="name" value={data.name} onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" required />
          </div>

          {/* Brand */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Brand</label>
            <input type="text" name="brand" value={data.brand} onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" required />
          </div>

          {/* Model */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Model</label>
            <input type="text" name="model" value={data.model} onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" required />
          </div>

          {/* Year */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Year</label>
            <input type="number" name="year" value={data.year} onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" required />
          </div>

          {/* Fuel Type Dropdown */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Fuel Type</label>
            <select name="fuelType" value={data.fuelType} onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" required>
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Car Manufacturer */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Manufacturer</label>
            <input type="text" name="carManufacturer" value={data.carManufacturer} onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" required />
          </div>

          {/* Address */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Address</label>
            <input type="text" name="address" value={data.address} onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" required />
          </div>

          {/* Regular Price */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Regular Price ($)</label>
            <input type="number" name="regularPrice" value={data.regularPrice} onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" required />
          </div>

          {/* Discount Price */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Discount Price ($)</label>
            <input type="number" name="discountPrice" value={data.discountPrice} onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" />
          </div>

          {/* Parking */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-semibold mb-2">Parking Available</label>
            <select name="parking" value={data.parking} onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" required>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Image URLs */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <label className="block text-gray-700 font-semibold mb-2">Image URLs (comma-separated)</label>
            <input type="text" name="imageUrls" value={data.imageUrls.join(', ')} 
              onChange={(e) => setData({ ...data, imageUrls: e.target.value.split(', ') })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200" />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center">
            <button type="submit" className="px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition">
              Update Car
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
