// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import DeliveryLocationDay from './DeliveryLocationDay';
// import Review from './Review';
// import Navbar from "./Navbar";
// import FooterUI from "./FooterUI";

// const CarDetail = () => {
//   const [car, setCar] = useState({});
//   const { id } = useParams();
  
//   useEffect(() => {
//     axios.get(`/carlisting/${id}`)
//       .then(res => {
//         setCar(res.data);
//       })
//       .catch(error => {
//         console.error('Error fetching car details:', error);
//       });
//   }, [id]);

//   if (!car) {
//     return <p className="text-center text-lg text-gray-600">Loading...</p>;
//   }

//   return (
//     <>
//      <Navbar />
//     <div className='container mx-auto p-6'>
//       <div className="bg-white shadow-lg rounded-lg p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <img src={car.imageURL} alt={car.name} className="w-full h-96 object-cover rounded-lg" />
          
//           <div className="space-y-4">
//             <h2 className="text-3xl font-bold text-gray-800">{car.name}</h2>
//             <p className="text-lg text-gray-600"><span className="font-semibold">Brand:</span> {car.brand}</p>
//             <p className="text-lg text-gray-600"><span className="font-semibold">Model:</span> {car.model}</p>
//             <p className="text-lg text-gray-600"><span className="font-semibold">Year:</span> {car.year}</p>
//             <p className="text-lg text-gray-600">{car.description}</p>
//             <p className={`text-lg font-semibold ${car.available ? 'text-green-600' : 'text-red-600'}`}>
//               {car.available ? 'Available' : 'Not Available'}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <DeliveryLocationDay car={car} />
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <Review />
//         </div>
//       </div>
//     </div>
//     <FooterUI/>
//     </>
//   );
// };

// export default CarDetail;