import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Function to check if a car is in the wishlist
  const isCarInWishlist = (car) => wishlist.some((item) => item._id === car._id);

  const addToWishlist = (car) => {
    if (!isCarInWishlist(car)) {
      setWishlist([...wishlist, car]);
    }
  };

  const removeFromWishlist = (car) => {
    setWishlist(wishlist.filter((item) => item._id !== car._id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isCarInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom Hook to use WishlistContext
export const useWishlist = () => useContext(WishlistContext);
