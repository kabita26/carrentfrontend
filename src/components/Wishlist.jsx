import React, { useEffect } from 'react';
import { useWishlist } from '../Context/WishlistContext';
import toast from 'react-hot-toast';
import { FaRegHeart } from "react-icons/fa";
import axios from 'axios';

const Wishlist = () => {
  const { wishlist, setWishlist } = useWishlist();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get('/wishlist');
        setWishlist(response.data.wishlist);
        localStorage.setItem('wishlist', JSON.stringify(response.data.wishlist));
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [setWishlist]);

  const addToWishlist = async (book) => {
    try {
      await axios.post('/wishlist/add', { book });
      setWishlist((prevWishlist) => [...prevWishlist, book]);
      toast.success('Added to wishlist');
      localStorage.setItem('wishlist', JSON.stringify([...wishlist, book]));
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  return (
    <div className='wishlist'>
      <h2>Your Wishlist</h2>
      {wishlist.length > 0 ? (
        <ul className='wishlist-ul'>
          {wishlist.map((bookItem) => (
            <li key={bookItem._id} className="wishlist-item"> 
              <img className="book-image__img" src={bookItem.imageURL} alt={bookItem.bookTitle} />
              <div className='wishlist-details'>
                <p>{bookItem.bookTitle}</p>
                <p>by: {bookItem.authorName}</p>
                <button onClick={() => addToWishlist(bookItem)} className='wishlist-icon'>
                  <FaRegHeart />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
