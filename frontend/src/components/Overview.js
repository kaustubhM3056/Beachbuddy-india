 import React, { useState } from 'react';
import { auth } from '../firebase'; // 🔥 This is the critical line that lets us know WHO is voting!

function StatCard({ icon, label, value }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.statBox,
        transform: isHovered ? 'scale(1.05) translateY(-5px)' : 'scale(1) translateY(0)',
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
        boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.3)' : 'none',
        border: isHovered ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div style={styles.icon}>{icon}</div>
      <strong style={styles.label}>{label}</strong>
      <p style={styles.statValue}>{value}</p>
    </div>
  );
}

function Overview({ bsiData }) {
  const [userVote, setUserVote] = useState(null);

  if (!bsiData) return null;

  // 🔥 THE REAL API CALL TO FLASK
  const handleVote = async (voteType) => {
    setUserVote(voteType); // Update UI instantly

    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user logged in! Cannot save vote.");
        return;
      }
      
      const token = await user.getIdToken(); // Get secure Firebase ticket

      // Send to your Flask Python Server
      const response = await fetch('http://127.0.0.1:5000/submit_crowd_vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          beachName: bsiData.city,
          crowdLevel: voteType
        })
      });

      if (response.ok) {
        console.log("🔥 Vote successfully saved to Database!");
      } else {
        console.error("Flask rejected the vote.");
      }

    } catch (error) {
      console.error("Failed to connect to backend:", error);
    }
  };

  return (
    <div style={styles.glassCard}>
      <h1 style={styles.beachTitle}>{bsiData.city}</h1>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={styles.conditionBadge}>
          Condition: {bsiData.rating}
        </div>
      </div>

      <div style={styles.grid}>
        <StatCard icon="📊" label="BSI Score" value={bsiData.bsi_score} />
        <StatCard icon="🌡️" label="Temperature" value={`${bsiData.temperature}°C`} />
        <StatCard icon="💨" label="Wind Speed" value={`${bsiData.wind_speed} km/h`} />
        
        <StatCard icon="🌊" label="Tide Height" value={`${bsiData.tide_height_m} m`} />
        <StatCard icon="🌧️" label="Rainfall" value={`${bsiData.rain_mm || 0} mm`} />
        <StatCard icon="💧" label="Humidity" value={`${bsiData.humidity || 65}%`} />
      </div>

      {/* THE LIVE CROWD METER WIDGET */}
      <div style={styles.crowdWidget}>
        {!userVote ? (
          <>
            <h3 style={styles.crowdTitle}>📍 Are you at {bsiData.city} right now?</h3>
            <p style={styles.crowdSubtitle}>Help other travelers by reporting the live crowd level:</p>
            
            <div style={styles.voteButtonsRow}>
              <button onClick={() => handleVote('Quiet')} style={{...styles.voteBtn, borderLeft: '4px solid #2ecc71'}}>
                🟢 Quiet
              </button>
              <button onClick={() => handleVote('Busy')} style={{...styles.voteBtn, borderLeft: '4px solid #f1c40f'}}>
                🟡 Busy
              </button>
              <button onClick={() => handleVote('Packed')} style={{...styles.voteBtn, borderLeft: '4px solid #e74c3c'}}>
                🔴 Packed
              </button>
            </div>
          </>
        ) : (
          <div style={styles.votedState}>
            <span style={{ fontSize: '32px' }}>🙏</span>
            <h3 style={{ margin: '10px 0 5px 0', color: 'white' }}>Thanks for updating the community!</h3>
            <p style={{ margin: 0, color: '#cbd5e1', fontSize: '15px' }}>
              You reported the beach as <strong>{userVote}</strong>. This earns you +1 Contribution!
            </p>
          </div>
        )}
      </div>

      <div style={styles.adviceBox}>
        <span style={{ fontSize: '20px', marginRight: '10px' }}>💡</span> 
        <strong>Advice:</strong> <span style={{ opacity: 0.9, marginLeft: '5px' }}>{bsiData.advice}</span>
      </div>
    </div>
  );
}

const styles = {
  glassCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '40px',
    color: 'white',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  beachTitle: {
    margin: '0 0 15px 0',
    fontSize: '3rem',
    fontWeight: '800',
    textAlign: 'center',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
    letterSpacing: '1px'
  },
  conditionBadge: {
    display: 'inline-block',
    background: 'rgba(0, 0, 0, 0.4)',
    padding: '10px 20px',
    borderRadius: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '25px'
  },
  statBox: {
    padding: '25px 15px',
    borderRadius: '16px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  icon: {
    fontSize: '32px',
    marginBottom: '10px'
  },
  label: {
    display: 'block',
    color: '#cbd5e1',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '8px'
  },
  statValue: {
    fontSize: '32px',
    margin: '0',
    fontWeight: '800',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  crowdWidget: {
    background: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '16px',
    padding: '25px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '25px',
    textAlign: 'center'
  },
  crowdTitle: {
    margin: '0 0 5px 0',
    fontSize: '20px',
    color: 'white'
  },
  crowdSubtitle: {
    margin: '0 0 20px 0',
    color: '#94a3b8',
    fontSize: '14px'
  },
  voteButtonsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap'
  },
  voteBtn: {
    padding: '12px 24px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    borderRight: '1px solid rgba(255,255,255,0.1)',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  votedState: {
    animation: 'fadeIn 0.5s ease'
  },
  adviceBox: {
    background: 'rgba(0, 168, 255, 0.2)',
    padding: '20px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(0, 168, 255, 0.3)',
    fontSize: '17px'
  }
};

export default Overview;