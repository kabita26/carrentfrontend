import AdminSideBar from "./AdminSideBar"; 
import { useState } from 'react';

const App = () => {
  const [openAdminSideBarToggle, setOpenAdminSideBarToggle] = useState(false);

  // Sidebar Toggle Function
  const toggleAdminSideBar = () => {
    setOpenAdminSideBarToggle(!openAdminSideBarToggle);
  };

  // Car Rental Data (Manually Added)
  const carRentals = [
    { id: 1, car: "Toyota Corolla", renter: "Rajesh Shrestha", status: "Booked", color: "bg-green-500" },
    { id: 2, car: "Honda Civic", renter: "Bishal Rai", status: "Pending", color: "bg-yellow-500" },
    { id: 3, car: "Ford Mustang", renter: "Niraj Lama", status: "Cancelled", color: "bg-red-500" },
    { id: 4, car: "BMW X5", renter: "Ramesh Thapa", status: "Booked", color: "bg-green-500" },
    { id: 5, car: "Audi A4", renter: "Sujan Karki", status: "Pending", color: "bg-yellow-500" },
    { id: 6, car: "Tesla Model 3", renter: "Anish Gurung", status: "Booked", color: "bg-green-500" },
    { id: 7, car: "Mercedes-Benz C-Class", renter: "Sandesh Magar", status: "Cancelled", color: "bg-red-500" },
    { id: 8, car: "Jeep Wrangler", renter: "Dipesh Adhikari", status: "Booked", color: "bg-green-500" },
    { id: 9, car: "Nissan Altima", renter: "Santosh Poudel", status: "Pending", color: "bg-yellow-500" },
    { id: 10, car: "Chevrolet Malibu", renter: "Bipin Tamang", status: "Cancelled", color: "bg-red-500" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSideBar 
        openSidebarToggle={openAdminSideBarToggle} 
        OpenSidebar={toggleAdminSideBar}
      />
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Car Rental Dashboard</h2>

        {/* Rental List Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Rentals</h3>
          <ul className="divide-y divide-gray-200">
            {carRentals.map((rental) => (
              <li key={rental.id} className="flex justify-between items-center py-3">
                <span className="text-gray-800">
                  {rental.car} - <span className="font-semibold">{rental.renter}</span>
                </span>
                <span className={`text-white px-3 py-1 rounded ${rental.color}`}>
                  {rental.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default App;
