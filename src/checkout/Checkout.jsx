import React, { useState, useEffect } from 'react';
import LeftCheckout from './LeftCheckout';
import Payment from './Payment';
import FooterUI from "../components/FooterUI";
import Navbar from "../components/Navbar";
import { useCheckout } from '../Context/CheckoutContext';
import axios from 'axios'; 
import toast from 'react-hot-toast';

function Checkout() {
  const [showPayment, setShowPayment] = useState(false);
  const { checkoutInfo, setRentalDetails } = useCheckout();
  const { imageURL, carName, brand, rentPricePerDay, pickupLocation, dropoffLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, rentalDays } = checkoutInfo;

  // State for selected options
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('COD');
  const [selectedShippingOption, setSelectedShippingOption] = useState('address');
  const [selectedRegion, setSelectedRegion] = useState('Koshi');

  // User input fields
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ 
    email: '',
    fullName: '',
    address: '',
    city: '',
    phone: '',
  });

  useEffect(() => {
    localStorage.setItem('selectedPaymentOption', selectedPaymentOption);
    localStorage.setItem('selectedShippingOption', selectedShippingOption);
    localStorage.setItem('selectedRegion', selectedRegion);
  }, [selectedPaymentOption, selectedShippingOption, selectedRegion]);

  // Calculate total rental cost
  const calculateRentalCost = () => {
    return Number(rentPricePerDay) * rentalDays;
  };

  // Calculate shipping cost
  const calculateShippingCost = () => {
    switch (selectedShippingOption) {
      case 'address': return 500;
      case 'others': return 800;
      case 'instant': return 1000;
      default: return 0;
    }
  };

  // Calculate total order cost
  const calculateTotalCost = () => {
    return calculateRentalCost() + calculateShippingCost();
  };

  // Handle Order Completion
  const handleCompleteOrder = async () => {
    try {
      setLoading(true);
      const orderData = {
        carName,
        brand,
        rentPricePerDay,
        rentalDays,
        pickupLocation,
        dropoffLocation,
        pickupDate,
        pickupTime,
        dropoffDate,
        dropoffTime,
        totalRentalCost: calculateRentalCost(),
        paymentOption: selectedPaymentOption,
        shippingOption: selectedShippingOption,
        region: selectedRegion,
        fullName: data.fullName,
        address: data.address,
        city: data.city,
        phone: data.phone,
        orderTotal: calculateTotalCost(),
        orderDate: new Date(),
      };

      // const response = await axios.post('http://localhost:3001/checkout', orderData);
      // console.log("Rental Order response:", response.data);

      toast.success('Car rental confirmed!');
      setShowPayment(true);
    } catch (error) {
      console.error('Error renting car:', error.response?.data);
      setError('Error renting car. Please try again.');
      toast.error('Error processing rental.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='checkout_mainContainer'>
        <LeftCheckout
          imageURL={imageURL}
          carName={carName}
          brand={brand}
          rentPricePerDay={rentPricePerDay}
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          pickupDate={pickupDate}
          pickupTime={pickupTime}
          dropoffDate={dropoffDate}
          dropoffTime={dropoffTime}
          rentalDays={rentalDays}
          setRentalDetails={setRentalDetails}
          calculateRentalCost={calculateRentalCost}
          calculateShippingCost={calculateShippingCost}
          calculateTotalCost={calculateTotalCost}
        />

        {showPayment ? (
          <Payment 
            contactInfo={{ email: data.email }}  
            shippingInfo={{
              fullName: data.fullName,
              address: data.address,
              city: data.city,
              region: selectedRegion,
              phone: data.phone,
              orderTotal: calculateTotalCost(),
            }}  
          />
        ) : (
          <div className='checkout_right'>
            <h2>Payment</h2>
            <div className='optionbox_checkout'>
              <div className='delivery_option'>
                <input
                  type="radio"
                  checked={selectedPaymentOption === 'COD'}
                  onChange={() => setSelectedPaymentOption('COD')}
                />
                <label>Cash on Delivery (COD)</label>
              </div>
              <div className='delivery_option'>
                <input
                  type="radio"
                  checked={selectedPaymentOption === 'Pay now'}
                  onChange={() => setSelectedPaymentOption('Pay now')}
                />
                <label>Pay Now</label>
              </div>
            </div>
            <div className='Corder_checkout' onClick={handleCompleteOrder}>
              <p>{loading ? "Processing..." : "Confirm Rental"}</p>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        )}
      </div>
      <FooterUI />
    </>
  );
}

export default Checkout;
