import React from 'react';
import './AverageRatings.css'; // We will create this file next

// Helper function to show stars
const renderStars = (rating) => {
  // Round the average rating to the nearest half-star
  const roundedRating = Math.round(rating * 2) / 2;
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push('★'); // Full star
    } else if (i - 0.5 === roundedRating) {
      stars.push('✫'); // Half star (if we want it, or just use ☆)
      // For simplicity, we'll just use full or empty
      // stars.push('★'); 
      stars.push('☆');
    } else {
      stars.push('☆'); // Empty star
    }
  }
  
  // Simple full/empty star logic
  const simpleRating = Math.round(rating); // Round to nearest whole number
  const fullStars = '★'.repeat(simpleRating);
  const emptyStars = '☆'.repeat(5 - simpleRating);
  
  return <span className="stars">{fullStars}{emptyStars}</span>;
};

function AverageRatings({ averages }) {
  if (averages.totalReviews === 0) {
    return null; // Don't show anything if there are no reviews
  }

  return (
    <div className="average-ratings-container">
      <h4>Community Ratings ({averages.totalReviews} reviews)</h4>
      <div className="amenities-grid">
        <div className="amenity-item">
          <span>Cleanliness</span>
          {renderStars(averages.cleanliness)}
        </div>
        <div className="amenity-item">
          <span>Accessibility</span>
          {renderStars(averages.accessibility)}
        </div>
        <div className="amenity-item">
          <span>Washrooms</span>
          {renderStars(averages.washrooms)}
        </div>
        <div className="amenity-item">
          <span>Food Stalls</span>
          {renderStars(averages.food)}
        </div>
        <div className="amenity-item">
          <span>Transport</span>
          {renderStars(averages.transport)}
        </div>
        <div className="amenity-item">
          <span>Crowd Level</span>
          {renderStars(averages.crowdLevel)}
        </div>
        <div className="amenity-item">
          <span>Parking</span>
          {renderStars(averages.parking)}
        </div>
        <div className="amenity-item">
          <span>Family-Friendly</span>
          {renderStars(averages.familyFriendly)}
        </div>
        <div className="amenity-item">
          <span>Water Sports</span>
          {renderStars(averages.waterSports)}
        </div>
      </div>
    </div>
  );
}

export default AverageRatings;