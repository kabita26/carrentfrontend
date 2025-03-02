import { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [checkoutInfo, setCheckoutInfo] = useState({
    imageURL: '',
    carName: '',
    brand: '',
    rentPricePerDay: 0,
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    rentalDays: 1,
  });

  const setCheckoutData = (imageURL, carName, brand, rentPricePerDay) => {
    setCheckoutInfo({ 
      imageURL, 
      carName, 
      brand, 
      rentPricePerDay, 
      pickupLocation: '',
      dropoffLocation: '',
      pickupDate: '',
      pickupTime: '',
      dropoffDate: '',
      dropoffTime: '',
      rentalDays: 1
    });
  };

  const setRentalDetails = (pickupLocation, dropoffLocation, pickupDate, pickupTime, dropoffDate, dropoffTime) => {
    const days = calculateRentalDays(pickupDate, dropoffDate);
    setCheckoutInfo((prev) => ({
      ...prev,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      rentalDays: days,
    }));
  };

  const calculateRentalDays = (pickupDate, dropoffDate) => {
    if (!pickupDate || !dropoffDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  return (
    <CheckoutContext.Provider value={{ checkoutInfo, setCheckoutData, setRentalDetails }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  return useContext(CheckoutContext);
};
