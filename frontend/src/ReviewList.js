import React, { useState, useEffect } from 'react';
import './ReviewList.css'; 

// Helper function to show stars
const renderStars = (rating) => {
  // This check handles old reviews that don't have the new fields
  if (typeof rating !== 'number' || rating < 1) {
    return <span className="stars-na">N/A</span>;
  }
  const stars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  return <span className="stars">{stars}{emptyStars}</span>;
};

function ReviewList({ beachName }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:5000/get_reviews?beach=${encodeURIComponent(beachName)}`);
        const data = await response.json();
        
        if (data.error) {
          console.error(data.error);
          setReviews([]);
        } else {
          setReviews(data);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
      setLoading(false);
    };

    fetchReviews();
  }, [beachName]); 

  if (loading) {
    return <p className="loading-text">Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p className="loading-text">No reviews yet. Be the first!</p>;
  }

  return (
    <div className="review-list-container">
      <h4>Recent User Reviews</h4>
      {reviews.map((review, index) => (
        <div key={index} className="review-item">
          <div className="review-header">
            <strong>{review.userEmail}</strong>
            <span className="review-date">{review.createdAt}</span>
          </div>
          
          {/* --- NEW: Display the 9-ratings grid --- */}
          <div className="amenities-grid">
            <div className="amenity-item">
              <span>Cleanliness</span>
              {renderStars(review.cleanliness)}
            </div>
            <div className="amenity-item">
              <span>Accessibility</span>
              {renderStars(review.accessibility)}
            </div>
            <div className="amenity-item">
              <span>Washrooms</span>
              {renderStars(review.washrooms)}
            </div>
            <div className="amenity-item">
              <span>Food Stalls</span>
              {renderStars(review.food)}
            </div>
            <div className="amenity-item">
              <span>Transport</span>
              {renderStars(review.transport)}
            </div>
            <div className="amenity-item">
              <span>Crowd Level</span>
              {renderStars(review.crowdLevel)}
            </div>
            <div className="amenity-item">
              <span>Parking</span>
              {renderStars(review.parking)}
            </div>
            <div className="amenity-item">
              <span>Family-Friendly</span>
              {renderStars(review.familyFriendly)}
            </div>
            <div className="amenity-item">
              <span>Water Sports</span>
              {renderStars(review.waterSports)}
            </div>
          </div>
          
          {/* Show text review only if it exists */}
          {review.reviewText && (
            <p className="review-text">{review.reviewText}</p>
          )}
          
          {review.photoURL && (
            <img src={review.photoURL} alt="Beach" className="review-photo" />
          )}
        </div>
      ))}
    </div>
  );
}

export default ReviewList; 