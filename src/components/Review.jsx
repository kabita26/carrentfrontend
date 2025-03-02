import React, { useState,useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Review = ({ bookId }) => {
  const [reviews, setReview] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const existingReviews = JSON.parse(localStorage.getItem('bookReviews')) || {};
    const storedReview = existingReviews[bookId];

    if (storedReview !== undefined) {
      setReview(Number(storedReview));
    }
  }, [bookId]);

  const handleStarClick = (starCount) => {
    setReview(starCount);
    setIsButtonDisabled(false); 
  };

  const handleStarHover = (starCount) => {
    setHoveredStar(starCount);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  const submitReview = () => {
    axios
      .post('/reviews', {
        bookId: bookId,
        rating: reviews,
      })
      .then((response) => {
        console.log('Review submitted successfully:', response.data);
        toast.success('Review submitted successfully');

        const existingReviews = JSON.parse(localStorage.getItem('bookReviews')) || {};
        existingReviews[bookId] = reviews;

        localStorage.setItem('bookReviews', JSON.stringify(existingReviews));
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <div className="star-rating-section">
      <h6 className="ReviewTitle">Rate this book:</h6>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${reviews >= star || hoveredStar >= star ? 'selected' : ''}`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={() => handleStarLeave()}
          >
            &#9733;
          </span>
        ))}
      </div>
      <div className='review-btn'>
      <button onClick={() => submitReview()} disabled={isButtonDisabled}>
        Submit Review
      </button>
      </div>
    </div>
  );
};

export default Review;
