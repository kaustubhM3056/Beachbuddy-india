 import React from 'react';
import './Leaderboard.css'; 
// --- 1. IMPORT THE SPECIAL LEADERBOARD ICON ---
import { LeaderboardWeatherIcon } from './WeatherIcon.js';

function Leaderboard({ beaches, onBeachClick }) {
  return (
    <div className="leaderboard-container">
      <h2>Top Beaches Today</h2>
      
      <div className="leaderboard-grid">
        {beaches.map((beach, index) => (
          <div 
            key={beach.city} 
            className="beach-card"
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url(${beach.image_url})` }}
            onClick={() => onBeachClick(beach.city)}
            title={`Click to search for ${beach.city}`}
          >
            <div className="card-rank">#{index + 1}</div>
            
            {/* --- 2. NEW: ADD THE WEATHER ICON TO THE CARD --- */}
            <div className="card-weather-icon">
              <LeaderboardWeatherIcon iconCode={beach.weather_icon} size={32} />
            </div>
            
            <div className="card-info">
              <h3>{beach.city}</h3>
              <div className="card-details">
                <span className="card-score">{beach.bsi_score} BSI</span>
                <span className="card-rating">{beach.rating}</span>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Leaderboard;