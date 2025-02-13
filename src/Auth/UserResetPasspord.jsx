import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    try {
      const response = await axios.post('/resetpassword', {
        email: email,
        newPassword: password,
      });

      if (response.data && response.status === 200) {
        setSuccessMessage('Password updated successfully!');
        setError('');
      } else {
        setError('An error occurred. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
      setSuccessMessage('');
    }
    
  };

  return (
    <div className='main-ResetPassword-wrapper'>
    <div className="wrapper-container-reset">
    <div className="leftcontent-reset"></div>
    <div className="wrapper-reset">
      <div className="form-box-reset">
        <h4>Reset Password</h4>
        {error && <div className="error-reset">{error}</div>}
        {successMessage &&
        <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
        <div className="input-box-reset">
            <input
              type="Email"
              placeholder="Enter Email"
              autoComplete="off"
              name="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>
          <div className="input-box-reset">
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-reset">
            Update
          </button>
        </form>
      </div>
      
    </div></div>
    </div>
  );
}

export default ResetPassword;
