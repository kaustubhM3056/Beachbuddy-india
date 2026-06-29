 import React from 'react';

function Photos({ bsiData }) {
  // If the data hasn't loaded yet, don't show anything
  if (!bsiData) return null;

  // 🔥 Grab the 6 images from our Python backend. 
  // If they somehow fail to load, use a safe fallback array so the app never crashes.
  const images = bsiData.images && bsiData.images.length > 0 
    ? bsiData.images 
    : Array(6).fill(bsiData.image_url || "https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg");

  return (
    <div style={styles.glassContainer}>
      <h2 style={styles.header}>📸 Photos of {bsiData.city}</h2>
      <p style={styles.subtitle}>Explore beautiful sights around the beach.</p>

      <div style={styles.imageGrid}>
        {images.map((imgUrl, index) => (
          <div 
            key={index} 
            style={styles.imageWrapper}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            <img 
              src={imgUrl} 
              alt={`${bsiData.city} View ${index + 1}`} 
              style={styles.image}
              // 🔥 If a specific image gets deleted from the web, this immediately replaces it with a backup
              onError={(e) => {
                e.target.src = "https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  glassContainer: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '40px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
  },
  header: {
    marginTop: 0,
    marginBottom: '10px',
    fontSize: '32px',
    fontWeight: '800',
    textAlign: 'center'
  },
  subtitle: {
    color: '#cbd5e1',
    marginBottom: '40px',
    textAlign: 'center',
    fontSize: '16px'
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  imageWrapper: {
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    aspectRatio: '4/3', // 🔥 This forces all 6 images to be the exact same size and shape!
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    background: 'rgba(0,0,0,0.2)' // Slight dark background while images load
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensures the image fills the box without stretching or squishing
  }
};

export default Photos;