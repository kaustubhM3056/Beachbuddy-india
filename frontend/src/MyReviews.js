import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; // Import auth to get the token
import './MyReviews.css'; 

// Helper function to show stars
const renderStars = (rating) => {
  if (!rating || rating === 0) {
    return <span className="stars-na">N/A</span>;
  }
  const simpleRating = Math.round(rating);
  const fullStars = '★'.repeat(simpleRating);
  const emptyStars = '☆'.repeat(5 - simpleRating);
  return <span className="stars">{fullStars}{emptyStars}</span>;
};

// This component receives a function to go back as a "prop"
function MyReviews({ onBackToHome }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyReviews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("No user logged in.");
        }
        
        // 1. Get the user's secure ID token
        const token = await user.getIdToken();

        // 2. Fetch reviews from your new secure backend route
        const response = await fetch('http://127.0.0.1:5000/get_my_reviews', {
          headers: {
            'Authorization': `Bearer ${token}` // Send the token
          }
        });

        const data = await response.json();

        if (response.status !== 200) {
          throw new Error(data.error || "Could not fetch reviews.");
        }
        
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch my reviews:", err);
        setError(err.message);
      }
      setLoading(false);
    };

    fetchMyReviews();
  }, []); // Run only once when the component loads

  return (
    <div className="my-reviews-container">
      <div className="my-reviews-header">
        
        {/* --- THIS IS THE CHANGED LINE --- */}
        <h2>My Reviews</h2> 
        
        <button onClick={onBackToHome} className="back-button">← Back to Home</button>
      </div>

      {loading && <p className="loading-text" style={{color: 'white'}}>Loading my reviews...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && reviews.length === 0 && (
        <p className="loading-text" style={{color: 'white'}}>You have not submitted any reviews yet.</p>
      )}

      {!loading && !error && reviews.length > 0 && (
        <div className="review-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-header">
                <strong>{review.beachName}</strong>
                <span className="review-date">{review.createdAt}</span>
              </div>
              
              <div className="amenities-grid">
                <div className="amenity-item"><span>Cleanliness</span>{renderStars(review.cleanliness)}</div>
                <div className="amenity-item"><span>Accessibility</span>{renderStars(review.accessibility)}</div>
                <div className="amenity-item"><span>Washrooms</span>{renderStars(review.washrooms)}</div>
                <div className="amenity-item"><span>Food Stalls</span>{renderStars(review.food)}</div>
                <div className="amenity-item"><span>Transport</span>{renderStars(review.transport)}</div>
                <div className="amenity-item"><span>Crowd Level</span>{renderStars(review.crowdLevel)}</div>
                <div className="amenity-item"><span>Parking</span>{renderStars(review.parking)}</div>
                <div className="amenity-item"><span>Family-Friendly</span>{renderStars(review.familyFriendly)}</div>
                <div className="amenity-item"><span>Water Sports</span>{renderStars(review.waterSports)}</div>
              </div>
              
              {review.reviewText && (
                <p className="review-text">{review.reviewText}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReviews; 