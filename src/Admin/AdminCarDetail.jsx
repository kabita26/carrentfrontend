import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';
import toast from 'react-hot-toast';

const AdminCarDetail = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/carlisting');
        console.log("API Response:", response.data); // Debugging
        const carsData = Array.isArray(response.data) ? response.data : response.data.cars;
        setCars(carsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/carlisting/${id}`);
      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
      toast.success('Car deleted successfully');
    } catch (error) {
      console.error('Error deleting car:', error);
      toast.error('Failed to delete car.');
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSideBar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Car Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(cars) && cars.length > 0 ? (
            cars.map((car) => (
              <div
                key={car._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <div className="w-full h-48">
                  <img
                    src={car.imageUrls?.[0] || 'https://via.placeholder.com/150'}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
                  <p className="text-sm text-gray-600">
                    <strong>Brand:</strong> {car.brand}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Model:</strong> {car.model}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Year:</strong> {car.year}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Price:</strong> ${car.regularPrice}
                  </p>
                </div>
                <div className="flex justify-between p-4 border-t border-gray-200">
                  <button
                    onClick={() => navigate(`/update-car/${car._id}`)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center w-full col-span-4">No cars available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCarDetail;
