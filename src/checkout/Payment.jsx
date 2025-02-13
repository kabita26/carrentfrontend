// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Esewa from "../images/Esewa.png";
// import Khalti1 from "../images/Khalti1.png";
// import QR_code from "../images/QRcode.jpg";
// import QRcode from "../images/QRcode2.jpg";

// function Payment({ contactInfo, shippingInfo }) {
//   const navigate = useNavigate();
//   const [selectedPaymentOption, setSelectedPaymentOption] = useState(
//     localStorage.getItem("selectedPaymentOption") || ""
//   );

//   useEffect(() => {
//     localStorage.setItem("selectedPaymentOption", selectedPaymentOption);
//   }, [selectedPaymentOption]);

//   const handleContinue = () => {
//     navigate("/");
//   };

//   const handlePaymentOptionChange = (option) => {
//     setSelectedPaymentOption(option);
//   };

//   return (
//     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold">Thank you for your order!</h2>
//       <div className="border-2 border-gray-800 w-3/4 rounded-lg p-4 mt-4">
//         <h4 className="font-bold">Order Details</h4>
//         <div className="flex justify-between">
//           <p>Contact Information</p>
//           <p className="font-bold">Pay Now</p>
//         </div>
//         <div className="flex justify-between">
//           <span>Email: {contactInfo.email}</span>
//           <span className="font-bold">Price: Rs {shippingInfo.orderTotal}</span>
//         </div>
//         <div className="flex justify-between mt-2">
//           <p>Shipping Address</p>
//           <p className="font-bold">Billing Address</p>
//         </div>
//         <div className="flex justify-between">
//           <span>Name: {shippingInfo.fullName}</span>
//           <span className="font-bold">Name: {shippingInfo.fullName}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Address: {shippingInfo.address}</span>
//           <span className="font-bold">Address: {shippingInfo.address}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Region: {shippingInfo.region}</span>
//           <span className="font-bold">Region: {shippingInfo.region}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Phone: {shippingInfo.phone}</span>
//           <span className="font-bold">Phone: {shippingInfo.phone}</span>
//         </div>
//       </div>
//       <h4 className="mt-4 font-bold">Choose a payment method:</h4>
//       <div className="flex space-x-4 mt-2">
//         <div className="w-40 h-24 cursor-pointer overflow-hidden border rounded-lg" onClick={() => handlePaymentOptionChange("esewa")}>
//           <img src={Esewa} alt="Esewa" className="w-full h-full object-cover" />
//         </div>
//         <div className="w-40 h-24 cursor-pointer overflow-hidden border rounded-lg" onClick={() => handlePaymentOptionChange("Khalti")}>
//           <img src={Khalti1} alt="Khalti" className="w-full h-full object-cover" />
//         </div>
//       </div>
//       {selectedPaymentOption === "esewa" && (
//         <div className="flex justify-center mt-4">
//           <img src={QR_code} alt="Esewa QR Code" className="w-48 h-52" />
//         </div>
//       )}
//       {selectedPaymentOption === "Khalti" && (
//         <div className="flex justify-center mt-4">
//           <img src={QRcode} alt="Khalti QR Code" className="w-48 h-52" />
//         </div>
//       )}
//       <button
//         onClick={handleContinue}
//         className="mt-6 px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800"
//       >
//         Continue Shopping
//       </button>
//     </div>
//   );
// }

// export default Payment;