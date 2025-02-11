// import { useState } from "react";
// import { MdEmail } from "react-icons/md";
// import { RiLockPasswordFill } from "react-icons/ri";
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../Context/AuthContext";
// import Navbar from "../components/Navbar";

// // Import Background Image
// import bgImage from "../../assets/car.png"; // Ensure this file exists in the assets folder

// function UserLogin() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();

//   const [data, setData] = useState({
//     email: '',
//     password: '',
//   });

//   const loginUser = async (e) => {
//     e.preventDefault();
//     const { email, password } = data;
//     try {
//       setLoading(true);
//       const response = await axios.post('/login', { email, password });
//       console.log('Server Response:', response);
      
//       if (response.data.error) {
//         toast.error(response.data.error);
//       } else {
//         setData({ email: '', password: '' });
//         login(response.data.token);
//         if (email === 'admin@gmail.com' && password === 'AdminPassword') {
//           navigate('/admin'); 
//         } else {
//           navigate('/'); 
//         }
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       toast.error('An error occurred during login');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
//         <div className="bg-white/80 backdrop-blur-lg shadow-lg rounded-xl p-8 w-full max-w-md">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🚗 Login to Car Rental</h2>
//           <form onSubmit={loginUser} className="space-y-5">
            
//             {/* Email Field */}
//             <div className="relative">
//               <input 
//                 type="email" 
//                 value={data.email} 
//                 onChange={(e) => setData({ ...data, email: e.target.value })} 
//                 required 
//                 className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 hover:border-blue-400 transition"
//                 placeholder="Enter your email" 
//               />
//               <span className="absolute left-3 top-3 text-gray-500">
//                 <MdEmail size={20} />
//               </span>
//             </div>

//             {/* Password Field */}
//             <div className="relative">
//               <input 
//                 type="password" 
//                 value={data.password} 
//                 onChange={(e) => setData({ ...data, password: e.target.value })} 
//                 required 
//                 className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 hover:border-blue-400 transition"
//                 placeholder="Enter your password" 
//               />
//               <span className="absolute left-3 top-3 text-gray-500">
//                 <RiLockPasswordFill size={20} />
//               </span>
//             </div>

//             {/* Remember & Forgot Password */}
//             <div className="flex justify-between text-sm text-gray-600">
//               <label className="flex items-center">
//                 <input type="checkbox" className="mr-2" />
//                 Remember me
//               </label>
//               <a href="forgotpassword" className="text-blue-600 hover:underline">
//                 Forgot Password?
//               </a>
//             </div>

//             {/* Submit Button */}
//             <button 
//               type="submit" 
//               className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition shadow-md"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>

//             {/* Register Link */}
//             <p className="text-center text-gray-600">
//               Don't have an account? 
//               <a href="register" className="text-blue-600 hover:underline ml-1">
//                 Register
//               </a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserLogin;
