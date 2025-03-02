import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSideBar from './AdminSideBar';

function CarRentalAdmin() {
  const [rentals, setRentals] = useState([
    { _id: "1", fullName: "Ram Shrestha", pickupLocation: "Kathmandu", carModel: "Toyota Corolla", phone: "9841-123456", status: "pending" },
    { _id: "2", fullName: "Sita Rai", pickupLocation: "Pokhara", carModel: "Honda City", phone: "9812-987654", status: "approved" },
    { _id: "3", fullName: "Krishna Gurung", pickupLocation: "Lalitpur", carModel: "Ford Mustang", phone: "9803-555123", status: "pending" },
    { _id: "4", fullName: "Pashupati Adhikari", pickupLocation: "Bhaktapur", carModel: "Hyundai Creta", phone: "9845-777888", status: "approved" },
    { _id: "5", fullName: "Sangita Karki", pickupLocation: "Chitwan", carModel: "Nissan X-Trail", phone: "9806-654321", status: "pending" },
    { _id: "6", fullName: "Ramesh Thapa", pickupLocation: "Dharan", carModel: "Kia Seltos", phone: "9815-888777", status: "approved" },
    { _id: "7", fullName: "Anjali Maharjan", pickupLocation: "Biratnagar", carModel: "Suzuki Swift", phone: "9808-456789", status: "pending" },
    { _id: "8", fullName: "Ganesh Bhandari", pickupLocation: "Janakpur", carModel: "Mercedes-Benz GLC", phone: "9842-999000", status: "approved" },
    { _id: "9", fullName: "Deepak Khadka", pickupLocation: "Hetauda", carModel: "Mahindra Scorpio", phone: "9817-222333", status: "pending" },
    { _id: "10", fullName: "Meera Tamang", pickupLocation: "Butwal", carModel: "Tesla Model 3", phone: "9809-111222", status: "approved" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/rental-orders');
        setRentals(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleStatusToggle = (rentalId) => {
    const updatedRentals = rentals.map((rental) => {
      if (rental._id === rentalId) {
        return { ...rental, status: rental.status === 'pending' ? 'approved' : 'pending' };
      }
      return rental;
    });
    setRentals(updatedRentals);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Rental Orders</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentals.map((rental) => (
            <div key={rental._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{rental.fullName}</h4>

              <div className="text-gray-600 space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-pink-500">📍</span>
                  <strong>Pickup Location:</strong> {rental.pickupLocation}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-500">🚗</span>
                  <strong>Car Model:</strong> {rental.carModel}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-red-500">📞</span>
                  <strong>Phone:</strong> {rental.phone}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className={`px-4 py-1 rounded-full text-sm font-semibold ${rental.status === 'pending' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>
                  {rental.status === 'pending' ? 'Pending' : 'Approved'}
                </span>

                <button onClick={() => handleStatusToggle(rental._id)} className="px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition shadow-md">
                  Toggle Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default CarRentalAdmin;
