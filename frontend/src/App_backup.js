import React, { useState, useEffect } from 'react';
import './App.css';
import Leaderboard from './Leaderboard.js';
import Login from './Login.js'; 
import ReviewForm from './ReviewForm.js';
import ReviewList from './ReviewList.js';
import AverageRatings from './AverageRatings.js'; 
import WeatherIcon from './WeatherIcon.js';
import MyReviews from './MyReviews.js'; 
import { auth } from './firebase'; 
import { onAuthStateChanged, signOut } from "firebase/auth"; 
import BeachAI from "./BeachAI";
import 'leaflet/dist/leaflet.css';
import MapView from './MapView';
 
function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
}

function App() {
  const [beachSearch, setBeachSearch] = useState("Baga Beach");
  const [bsiData, setBsiData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [forecast, setForecast] = useState([]);

  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [viewMode, setViewMode] = useState('home');
 
  // 🔥 NEW STATES (ADDED)
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [predictionData, setPredictionData] = useState(null);
  const [predictionError, setPredictionError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
      setViewMode('home'); 
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLeaderboard = () => {
      fetch('http://127.0.0.1:5000/leaderboard')
        .then(res => res.json())
        .then(data => {
          setLeaderboard(data); 
          setLeaderboardLoading(false);
        })
        .catch(err => {
          console.error("Error fetching leaderboard:", err);
          setLeaderboardLoading(false);
        });
    };
    fetchLeaderboard(); 
    const intervalId = setInterval(fetchLeaderboard, 300000);
    return () => clearInterval(intervalId);
  }, []); 

  const handleLogout = () => {
    signOut(auth).catch((error) => console.error("Logout Error:", error));
  };

  const fetchBSI = () => {
    setLoading(true);
    setBsiData(null);
    setForecast([]);
    setShowReviewForm(false); 
    
    fetch(`http://127.0.0.1:5000/bsi?beach=${encodeURIComponent(beachSearch)}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setBsiData({ rating: `Error: Sorry, we don't have data for '${beachSearch}'` });
        } else {
          setBsiData(data);

          // ✅ FORECAST (unchanged)
          fetch(`http://127.0.0.1:5000/forecast/${encodeURIComponent(beachSearch)}`)
          .then(res => res.json())
          .then(data => {
           console.log("FORECAST:", data);
           setForecast(data);
           })
           .catch(err => console.error("Forecast error:", err)); 

          if (data.rain_mm > 1) {
            alert(`🌧️ RAIN ALERT for ${data.city}!\n\nIt is currently raining.`);
          }
          if (data.wind_speed > 35) {
            alert(`💨 HIGH WIND ALERT for ${data.city}!\n\nUnsafe for swimming!`);
          }
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setBsiData({ rating: `Error: Could not fetch data.` });
        setLoading(false);
      });
  };

  // 🔥 NEW FUNCTION (ADDED)
  const handlePrediction = () => {
    if (!selectedDateTime) return;

    const formatted = selectedDateTime.replace("T", " ");

    fetch(`http://127.0.0.1:5000/predict?beach=${encodeURIComponent(beachSearch)}&datetime=${formatted}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setPredictionError(data.error);
          setPredictionData(null);
        } else {
          setPredictionData(data);
          setPredictionError("");
        }
      })
      .catch(err => console.error(err));
  };
  
  const handleLeaderboardClick = (beachName) => {
    setBeachSearch(beachName);
    setTimeout(() => { fetchBSI(); }, 100); 
    window.scrollTo(0, 0); 
  };
  
  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    fetchBSI(); 
  };
  
  if (!user) {
    return <Login />;
  }

  return (
    <div className="App">
      <header className="App-header">
        
        <div className="header-top-row">
          <h1>BeachBuddy India</h1>
          <div className="header-buttons">
            <button onClick={() => setViewMode('profile')} className="profile-button">
              My Profile
            </button>
            <button onClick={handleLogout} className="logout-button">
              Log Out
            </button>
          </div>
        </div>
        
        <p>Find the best beach conditions right now.</p>
        
        {viewMode === 'home' && (
          <div className="input-container">
            <input
              type="text"
              value={beachSearch}
              onChange={(e) => setBeachSearch(e.target.value)}
              placeholder="Enter beach name"
            />
            <button onClick={fetchBSI} disabled={loading}>
              {loading ? "Checking..." : "Check Suitability"}
            </button>
          </div>
        )}
      </header>
      
      {viewMode === 'home' ? (
        <>
          {leaderboardLoading ? (
            <LoadingSpinner />
          ) : (
            <Leaderboard beaches={leaderboard} onBeachClick={handleLeaderboardClick} />
          )}

          {loading && <LoadingSpinner />}

          {bsiData && (
            <div className={`results-card ${bsiData.image_url ? 'with-image' : ''}`}>
              
              {bsiData.image_url && (
                <div 
                  className="card-image-header"
                  style={{ backgroundImage: `url(${bsiData.image_url})` }}
                ></div>
              )}

              <div className="card-content-wrapper">
               
                {bsiData.rating.startsWith("Error:") ? (
                  <h3 className="rating">{bsiData.rating}</h3>
                ) : (
                  <>
                    <div className="card-header">
                      <h2>{bsiData.city}</h2>
                    </div>

                    <div className="rating-with-icon">
                      <WeatherIcon iconCode={bsiData.weather_icon} size={64} />
                      <h3 className="rating">{bsiData.rating}</h3>
                    </div>

                    <div className="details">
                      <p><strong>BSI Score:</strong> {bsiData.bsi_score}</p>
                      <p><strong>Temp:</strong> {bsiData.temperature}°C</p>
                      <p><strong>Wind:</strong> {bsiData.wind_speed} km/h</p>
                      <p><strong>Tide:</strong> {bsiData.tide_height_m} m</p>
                    </div>

                    <p className="advice-text">
                      💡 {bsiData.advice}
                    </p>

                    <BeachAI data={bsiData} />

                    {/* 🔮 NEW FUTURE PREDICTION */}
                    <div className="prediction-container">
                      <h2>🔮 Future Prediction</h2>

                      <input
                        type="datetime-local"
                        value={selectedDateTime}
                        onChange={(e) => setSelectedDateTime(e.target.value)}
                      />

                      <button onClick={handlePrediction}>
                        Predict
                      </button>

                      {predictionError && <p className="error">{predictionError}</p>}

                      {predictionData && (
                        <div className="prediction-result">
                          <p><strong>Time:</strong> {predictionData.time}</p>
                          <p><strong>Temp:</strong> {predictionData.temp}°C</p>
                          <p><strong>Wind:</strong> {predictionData.wind} km/h</p>
                          <p><strong>Rain:</strong> {predictionData.rain} mm</p>
                          <h3>{predictionData.bsi} - {predictionData.rating}</h3>
                        </div>
                      )}
                    </div>
                    <MapView 
                    lat={bsiData.lat} 
                    lon={bsiData.lon} 
                    name={bsiData.city} 
                    />
                    
                    <AverageRatings averages={bsiData.average_ratings} />
                    <ReviewList beachName={bsiData.city} />

                  </>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <MyReviews onBackToHome={() => setViewMode('home')} />
      )}
    </div>
  );
}

export default App;