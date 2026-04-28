import React, { useState } from 'react';
import { db, auth } from './firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './ReviewForm.css'; 

function ReviewForm({ beachName, onReviewSubmitted }) {
  // --- STATES FOR ALL 9 RATINGS ---
  const [cleanliness, setCleanliness] = useState('3');
  const [accessibility, setAccessibility] = useState('3'); // Handicap
  const [washrooms, setWashrooms] = useState('3');
  const [food, setFood] = useState('3');
  const [transport, setTransport] = useState('3');
  const [crowdLevel, setCrowdLevel] = useState('3');
  const [parking, setParking] = useState('3');
  const [familyFriendly, setFamilyFriendly] = useState('3');
  const [waterSports, setWaterSports] = useState('3');
  
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!auth.currentUser) {
      setError("You must be logged in to post a review.");
      setLoading(false);
      return;
    }
    
    try {
      // --- ADD ALL 9 FIELDS TO THE DATABASE ---
      await addDoc(collection(db, "reviews"), {
        beachName: beachName,
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        createdAt: serverTimestamp(),
        
        // Your 9 structured data points:
        cleanliness: parseInt(cleanliness),
        accessibility: parseInt(accessibility),
        washrooms: parseInt(washrooms),
        food: parseInt(food),
        transport: parseInt(transport),
        crowdLevel: parseInt(crowdLevel),
        parking: parseInt(parking),
        familyFriendly: parseInt(familyFriendly),
        waterSports: parseInt(waterSports),
        
        reviewText: reviewText, // The text review
      });

      // Success!
      setLoading(false);
      alert("Review submitted successfully!");
      onReviewSubmitted(); // Close the form
      
    } catch (err) {
      console.error(err);
      setError("Failed to submit review. Please try again.");
      setLoading(false);
    }
  };
  
  // Helper function to create 1-5 rating options
  const renderRatingOptions = () => (
    <>
      <option value="5">5 - Excellent</option>
      <option value="4">4 - Good</option>
      <option value="3">3 - Average</option>
      <option value="2">2 - Poor</option>
      <option value="1">1 - Very Bad</option>
    </>
  );

  return (
    <div className="review-form-container">
      <h3>Submit your detailed review for {beachName}</h3>
      <form onSubmit={handleSubmit}>
        
        {/* --- NEW: 9-ITEM RATING GRID --- */}
        <div className="ratings-grid">
          <div className="form-group">
            <label htmlFor="cleanliness">Cleanliness</label>
            <select id="cleanliness" value={cleanliness} onChange={(e) => setCleanliness(e.target.value)}>
              {renderRatingOptions()}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="accessibility">Handicap Access</label>
            <select id="accessibility" value={accessibility} onChange={(e) => setAccessibility(e.target.value)}>
              {renderRatingOptions()}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="washrooms">Washrooms</label>
            <select id="washrooms" value={washrooms} onChange={(e) => setWashrooms(e.target.value)}>
              {renderRatingOptions()}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="food">Food Stalls</label>
            <select id="food" value={food} onChange={(e) => setFood(e.target.value)}>
              {renderRatingOptions()}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="transport">Local Transport</label>
            <select id="transport" value={transport} onChange={(e) => setTransport(e.target.value)}>
              {renderRatingOptions()}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="crowdLevel">Crowd Level</label>
            <select id="crowdLevel" value={crowdLevel} onChange={(e) => setCrowdLevel(e.target.value)}>
              {renderRatingOptions()}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="parking">Parking</label>
            <select id="parking" value={parking} onChange={(e) => setParking(e.target.value)}>
              {renderRatingOptions()}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="familyFriendly">Family-Friendliness</label>
            <select id="familyFriendly" value={familyFriendly} onChange={(e) => setFamilyFriendly(e.target.value)}>
              {renderRatingOptions()}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="waterSports">Water Sports</label>
            <select id="waterSports" value={waterSports} onChange={(e) => setWaterSports(e.target.value)}>
              {renderRatingOptions()}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="reviewText">Your Review (Optional)</label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="How was your experience?"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-review-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm; 