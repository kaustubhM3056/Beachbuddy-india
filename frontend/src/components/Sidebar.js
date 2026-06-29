 import React from 'react';

function Sidebar({ activeTab, setActiveTab, onBackToHome }) {
   const menuItems = [
    { id: 'overview', label: 'Overview'  },
    { id: 'nearby', label: 'Nearby Places'  }, // 🔥 Added this here!
    { id: 'photos', label: 'Photos'  },
    { id: 'ai', label: 'Beach AI Chat'  },
    { id: 'prediction', label: 'Future Prediction'  },
    { id: 'map', label: 'Map' },
    { id: 'reviews', label: 'Community Reviews'  }
  ];

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.title}>Menu</h3>
      
      <button onClick={onBackToHome} style={styles.homeButton}>
        ⬅ Back to Search
      </button>

      <div style={styles.divider}></div>

      {menuItems.map(item => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          style={{
            ...styles.button,
            backgroundColor: activeTab === item.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            fontWeight: activeTab === item.id ? 'bold' : 'normal',
            borderLeft: activeTab === item.id ? '4px solid #00a8ff' : '4px solid transparent'
          }}
        >
          <span style={{ marginRight: '10px' }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: '280px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '24px',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    height: 'fit-content',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    position: 'sticky',
    top: '40px'
  },
  title: {
    color: 'rgba(255,255,255,0.7)',
    margin: '0 0 10px 0',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '14px',
    textAlign: 'center'
  },
  homeButton: {
    padding: '14px 15px',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '15px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  divider: {
    height: '1px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: '10px 0'
  },
  button: {
    padding: '14px 15px',
    borderRadius: '12px',
    color: 'white',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center'
  }
};

export default Sidebar;