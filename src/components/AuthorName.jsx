import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import FooterUI from "../components/FooterUI";
import Navbar from "../components/Navbar";
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';

const AuthorName = () => {
  const [authorbooks, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authorName } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();


  const handleAddToCart = (book) => {
    if (user) {
      addToCart(book);
    } else {
      console.error('User is not authenticated. Cannot add item to the cart.');
      
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/authorbooks/${authorName}`);
        setBooks(response.data.authorbooks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [authorName]);

  return (
    <>
     <Navbar />
      <div className="Authorcontents">
            </div>
            <div className="AuthorbooksView-content">
              <div className="Author-name">
            <h2>{authorName}</h2>
              </div>
                <div className="Authorbooks-row">
                  {authorbooks.map((book) => (
                    <Link to={`/carlisting/${car._id}`} key={car._id} className="Authorbooks-items">
                        <div className="Authorbook-item-content">
                          <div className="book-cardAuthor">
                          <div className="book-img-Author">
                            <img src={book.imageURL} alt={`Cover of ${book.bookTitle}`} />
                            <div>
                              <div className="Authorbook-text">
                                <h4>{book.bookTitle}</h4>
                                <p>{'Rs. ' + book.price}</p>
                                <button onClick={() => handleAddToCart(book)} className="Authoradd-to-cart-btn">ADD TO CART</button>
                              </div>
                            </div>
                          </div>
                          </div>
                        </div>
                    </Link>
                  ))}
                </div>
              </div>
              <FooterUI/>
    </>
  );
};

export default AuthorName;
