import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar'

const ForgotPassword = () => {
const navigate = useNavigate();
const [error, setError] = useState(null);
const [data, setData] = useState({
    email: '',
});

const forgotPassword = async (e) => {
    e.preventDefault();
    const { email } = data;

    try {
    const response = await axios.post('/forgotpassword', {
        email,
    });

    if (response.data.error) {
        // Display error using toast or other notification libraries
        toast.error(response.data.error);
    } else {
        // Redirect to Reset Password page with the email parameter
        navigate(`/Resetpassword/${email}`);
    }
    } catch (error) {
      // Log the error for debugging
    console.error();

      // Set an error message for display
    setError('An error occurred. Please try again.');
    }
};

return (
    <>
    <Navbar/>
    <div className="main-Forgot-wrapper">
        <div class="wrapper-container-forgot">
        <div className="leftcontent_Forgot"></div>
    <div className="wrapperForgot">
    <div className="form-box-forgot">
        <h4>Forgot Password</h4>
        {/* Display error message if there's any */}
        {error && <div className="error-message-forgot">{error}</div>}
        <form onSubmit={forgotPassword}>
        <div className="input-box">
            <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            className="input-box-forgot"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            />
        </div>
        <button type="submit" className="btn-Forgot ">
            Send
        </button>
        </form>
    </div>
    </div>
    </div>
    </div>
    </>
);
};

export default ForgotPassword;
