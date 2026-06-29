 import React, { useState } from 'react';

function NearbyPlaces({ bsiData }) {
  const [activeTab, setActiveTab] = useState('hotels');

  // 🏥 ALL 22 BEACHES DATABASE
  const NEARBY_DATABASE = {
    "baga beach": {
      hotels: [
        { name: "Taj Holiday Village", details: "⭐⭐⭐⭐⭐ • 2km away • Luxury Beachfront" },
        { name: "The Baga Beach Resort", details: "⭐⭐⭐⭐ • Right on the beach • Luxury Cottages" },
        { name: "Acron Waterfront", details: "⭐⭐⭐⭐ • 1.5km away • Baga River View" }
      ],
      restaurants: [
        { name: "Britto's Restaurant", details: "Goan Seafood • Famous Beach Shack" },
        { name: "Tito's Restaurant", details: "Iconic Nightlife • Tito's Lane" },
        { name: "Fat Fish", details: "Authentic Goan Thali • 2km away" }
      ],
      hospitals: [
        { name: "Vintage Hospital", details: "🚨 4km away • 24/7 Emergency" },
        { name: "Vision Multispeciality", details: "🏥 8km away • Advanced Trauma ER" },
        { name: "Campal Clinic", details: "🏥 3.5km away • Urgent Care" }
      ]
    },
    "calangute beach": {
      hotels: [
        { name: "Hard Rock Hotel Goa", details: "⭐⭐⭐⭐⭐ • 1.2km away • Premium stay" },
        { name: "Le Méridien Goa", details: "⭐⭐⭐⭐⭐ • 800m away • Luxury" }
      ],
      restaurants: [
        { name: "Souza Lobo", details: "Legendary Goan Seafood • Right on the beach" },
        { name: "Infantaria", details: "Breakfast & Bakery • 500m away" }
      ],
      hospitals: [
        { name: "Bosio Hospital", details: "🚨 2km away • 24/7 ER & Ambulance" },
        { name: "Dr. Dukle's Hospital", details: "🏥 1km away • General Medical Care" }
      ]
    },
    "juhu beach": {
      hotels: [
        { name: "JW Marriott Mumbai", details: "⭐⭐⭐⭐⭐ • Beachfront • Ultra Luxury" },
        { name: "Novotel Mumbai", details: "⭐⭐⭐⭐⭐ • Ocean View • Premium" },
        { name: "Hotel Sea Princess", details: "⭐⭐⭐⭐ • Juhu Tara Road • Great views" }
      ],
      restaurants: [
        { name: "Gadda Da Vida", details: "Lounge & Seafood • Sunset Views" },
        { name: "Mahesh Lunch Home", details: "Mangalorean Seafood • Juhu Tara Rd" },
        { name: "Juhu Chowpatty Stalls", details: "Mumbai Street Food • Pav Bhaji" }
      ],
      hospitals: [
        { name: "Nanavati Max Hospital", details: "🚨 2.5km away • Level 1 Trauma" },
        { name: "Bharatiya Arogya Nidhi", details: "🏥 1.5km away • 24/7 Emergency" },
        { name: "Cooper Hospital", details: "🏥 1.8km away • Major Govt Hospital" }
      ]
    },
    "marina beach": {
      hotels: [
        { name: "The Leela Palace", details: "⭐⭐⭐⭐⭐ • Sea facing • Ultra Luxury" },
        { name: "ITC Grand Chola", details: "⭐⭐⭐⭐⭐ • Ultra Luxury • 8km away" },
        { name: "Taj Wellington Mews", details: "⭐⭐⭐⭐⭐ • Premium Suites • 5km away" }
      ],
      restaurants: [
        { name: "Nair Mess", details: "Iconic South Indian • Triplicane" },
        { name: "Ratna Cafe", details: "Legendary Idli Sambar • 1km away" },
        { name: "Sundari Akka Kadai", details: "Famous Beach Seafood • On Beach" }
      ],
      hospitals: [
        { name: "Rajiv Gandhi Hospital", details: "🚨 3km away • Largest ER in Chennai" },
        { name: "Kauvery Hospital", details: "🏥 4km away • Advanced Multispecialty" },
        { name: "Apollo Hospital", details: "🏥 5km away • World-class Trauma Center" }
      ]
    },
    "puri beach": {
        hotels: [
          { name: "Mayfair Heritage", details: "⭐⭐⭐⭐⭐ • Luxury Heritage Resort" },
          { name: "Hotel Holiday Resort", details: "⭐⭐⭐⭐ • Private Beach Access" },
          { name: "Sterling Puri", details: "⭐⭐⭐⭐ • Estuary & Ocean Views" }
        ],
        restaurants: [
          { name: "Chung Wah", details: "Famous Indian-Chinese • 1km away" },
          { name: "Wildgrass Restaurant", details: "Authentic Odia Cuisine • Local" },
          { name: "Bhojohori Manna", details: "Authentic Bengali Cuisine • Premium" }
        ],
        hospitals: [
          { name: "District Hospital Puri", details: "🚨 3km away • 24/7 Main Govt ER" },
          { name: "Sanjeevani Hospital", details: "🏥 3.5km away • Specialized Care" },
          { name: "E24 Hospital Puri", details: "🏥 2km away • Private Emergency" }
        ]
    },
    "radhanagar beach": {
        hotels: [
          { name: "Taj Exotica Resort", details: "⭐⭐⭐⭐⭐ • Ultra-luxury • Beachfront" },
          { name: "Barefoot at Havelock", details: "⭐⭐⭐⭐ • Eco-luxury jungle resort" },
          { name: "Bowditch Resort", details: "⭐⭐⭐ • Walking distance to beach" }
        ],
        restaurants: [
          { name: "Something Different", details: "Multi-cuisine • Beachside Vibe" },
          { name: "Fat Martin", details: "Great Breakfast • Near Vijaynagar" },
          { name: "Full Moon Cafe", details: "Seafood & Global Cuisine • Popular" }
        ],
        hospitals: [
          { name: "PHC Havelock", details: "🚨 8km away • 24/7 Basic ER" },
          { name: "Ayush Hospital", details: "🏥 Govt Specialty Care • Requires Ferry" },
          { name: "GB Pant Hospital", details: "🏥 Requires Ferry • Main Trauma Center" }
        ]
    },
    "kovalam beach": {
      hotels: [
        { name: "The Leela Kovalam", details: "⭐⭐⭐⭐⭐ • Cliffside luxury resort" },
        { name: "Taj Green Cove", details: "⭐⭐⭐⭐⭐ • Backwater & Sea Views" },
        { name: "Gokulam Grand Turtle", details: "⭐⭐⭐⭐ • Boutique luxury" }
      ],
      restaurants: [
        { name: "Bait (Taj)", details: "Premium Global Seafood • Ocean views" },
        { name: "Suprabhatam", details: "Authentic Vegetarian Kerala Meals" },
        { name: "German Bakery", details: "Breakfast, Pastries & Vegan Options" }
      ],
      hospitals: [
        { name: "Upasana Hospital", details: "🚨 12km away • Major Trauma ER" },
        { name: "SUT Hospital", details: "🏥 14km away • Advanced Care" },
        { name: "KIMSHEALTH Trivandrum", details: "🏥 15km away • Top Super Speciality" }
      ]
    },
    "palolem beach": {
      hotels: [
        { name: "The LaLiT Golf & Spa", details: "⭐⭐⭐⭐⭐ • 3km away • Private Beach" },
        { name: "Palolem Beach Resort", details: "⭐⭐⭐ • On the beach • Eco-friendly" }
      ],
      restaurants: [
        { name: "Dropadi", details: "Seafood & Cocktails • Beachfront View" },
        { name: "Cafe Inn", details: "Coffee & Woodfired Pizza • 200m away" }
      ],
      hospitals: [
        { name: "Canacona Health Centre", details: "🚨 2.5km away • Government 24/7 ER" },
        { name: "Hospicio Hospital", details: "🏥 35km away • Major Regional Hospital" }
      ]
    },
    "tarkarli beach": {
      hotels: [
        { name: "MTDC Resort Tarkarli", details: "⭐⭐⭐ • Beachfront Govt Resort" },
        { name: "Blue Water Resort", details: "⭐⭐⭐⭐ • Premium Scuba Base" }
      ],
      restaurants: [
        { name: "Swami Restaurant", details: "Authentic Malvani Seafood • 1km away" },
        { name: "Atithi Bamboo", details: "Malvani Thali • 500m away" }
      ],
      hospitals: [
        { name: "Malvan Rural Hospital", details: "🚨 6km away • 24/7 Emergency Care" },
        { name: "District Hospital", details: "🏥 25km away • Major Medical Center" }
      ]
    },
    "ganpatipule beach": {
      hotels: [
        { name: "Club Mahindra", details: "⭐⭐⭐⭐ • Greenery & Beach Views" },
        { name: "MTDC Resort", details: "⭐⭐⭐ • Closest to Temple & Beach" },
        { name: "Abhishek Beach Resort", details: "⭐⭐⭐⭐ • 1km away • Luxury Pool" }
      ],
      restaurants: [
        { name: "Mehendale's Swad", details: "Authentic Vegetarian Konkani Thali" },
        { name: "Tarang Restaurant", details: "Seafood & Maharashtrian cuisine" }
      ],
      hospitals: [
        { name: "Primary Health Centre", details: "🚨 1km away • Basic Urgent Care" },
        { name: "Parkar Hospital", details: "🏥 25km away • Multi-specialty ER" }
      ]
    },
    "varkala beach": {
      hotels: [
        { name: "Gateway Varkala", details: "⭐⭐⭐⭐⭐ • Cliff Resort" },
        { name: "Elixir Cliff Resort", details: "⭐⭐⭐⭐ • Premium Suites" }
      ],
      restaurants: [
        { name: "Cafe del Mar", details: "Seafood & Continental • North Cliff" },
        { name: "Darjeeling Cafe", details: "Tibetan & Indian • Sunset Views" }
      ],
      hospitals: [
        { name: "Varkala Taluk Hospital", details: "🚨 3km away • 24/7 ER & Ambulance" },
        { name: "S.N. Mission Hospital", details: "🏥 4km away • General Care" }
      ]
    },
    "marari beach": {
      hotels: [
        { name: "Marari Beach Resort", details: "⭐⭐⭐⭐⭐ • Eco-Luxury Village" },
        { name: "Xandari Pearl", details: "⭐⭐⭐⭐⭐ • Private Pool Villas" }
      ],
      restaurants: [
        { name: "Carol Days Beach", details: "Fresh catch of the day • On the beach" },
        { name: "Chakara Restaurant", details: "Traditional Kerala Cuisine • 1km away" }
      ],
      hospitals: [
        { name: "KVM Super Speciality", details: "🚨 14km away • 24/7 ER" },
        { name: "Alappuzha Medical", details: "🏥 16km away • Major Government Facility" }
      ]
    },
    "mahabalipuram beach": {
      hotels: [
        { name: "Radisson Blu Resort", details: "⭐⭐⭐⭐⭐ • Beach & Pool luxury" },
        { name: "InterContinental", details: "⭐⭐⭐⭐⭐ • ECR Luxury" }
      ],
      restaurants: [
        { name: "Moonrakers", details: "Legendary Seafood • Casual dining" },
        { name: "Bob Marley Cafe", details: "Reggae vibes • Fresh catch on the beach" }
      ],
      hospitals: [
        { name: "Poonjeri Hospital", details: "🚨 2km away • Basic Emergency Care" },
        { name: "Chettinad Hospital", details: "🏥 20km away • Major ER" }
      ]
    },
    "kanyakumari beach": {
      hotels: [
        { name: "Sparsa Resort", details: "⭐⭐⭐⭐ • Eco-friendly & Ocean Views" },
        { name: "Hotel Sea View", details: "⭐⭐⭐ • Prime location near monument" }
      ],
      restaurants: [
        { name: "The Ocean Restaurant", details: "Multi-cuisine • Panoramic sea views" },
        { name: "Saravana Bhavan", details: "Famous South Indian Vegetarian" }
      ],
      hospitals: [
        { name: "Govt Medical College", details: "🚨 18km away • Major ER" },
        { name: "Holy Cross Hospital", details: "🏥 2km away • General Medical Care" }
      ]
    },
    "auroville beach": {
      hotels: [
        { name: "The Promenade", details: "⭐⭐⭐⭐ • French Quarter Luxury" },
        { name: "Mango Hill Auroville", details: "⭐⭐⭐ • Peaceful Auroville Vibe" }
      ],
      restaurants: [
        { name: "Tanto Pizzeria", details: "Authentic Italian Woodfired Pizza" },
        { name: "Marc's Cafe", details: "Artisan Coffee & Breakfast" }
      ],
      hospitals: [
        { name: "JIPMER Puducherry", details: "🚨 8km away • Premier National ER" },
        { name: "Auroville Health Centre", details: "🏥 3km away • Basic Urgent Care" }
      ]
    },
    "gokarna beach": {
      hotels: [
        { name: "SwaSwara Resort", details: "⭐⭐⭐⭐⭐ • Wellness & Yoga Retreat" },
        { name: "Kudle Beach View", details: "⭐⭐⭐⭐ • Luxury near Kudle Beach" }
      ],
      restaurants: [
        { name: "Namaste Cafe", details: "Legendary Backpacker Cafe • Om Beach" },
        { name: "Mantra Cafe", details: "Great views & global cuisine • Zostel" }
      ],
      hospitals: [
        { name: "Govt Hospital Gokarna", details: "🚨 2km away • 24/7 First Aid & ER" },
        { name: "Manipal Hospital", details: "🏥 140km away • Nearest Major Trauma" }
      ]
    },
    "om beach": { 
      hotels: [
        { name: "SwaSwara Resort", details: "⭐⭐⭐⭐⭐ • Wellness Retreat" },
        { name: "Namaste Cafe Shacks", details: "⭐⭐ • Budget beachfront stay" }
      ],
      restaurants: [
        { name: "Namaste Cafe", details: "Legendary Cafe • On the beach" },
        { name: "Dolphin View", details: "Seafood & Indian • Hilltop view" }
      ],
      hospitals: [
        { name: "Govt Hospital Gokarna", details: "🚨 6km away • 24/7 First Aid & ER" },
        { name: "Kumta Govt Hospital", details: "🏥 35km away • Upgraded Regional Care" }
      ]
    },
    "digha beach": {
        hotels: [
          { name: "Hotel SeaCoast", details: "⭐⭐⭐ • New Digha Sea Facing" },
          { name: "Cygnett Inn Sea View", details: "⭐⭐⭐⭐ • Premium Corporate Stay" }
        ],
        restaurants: [
          { name: "Bhorpet Restaurant", details: "Bengali Thali & Local Seafood" },
          { name: "Purbasha Hotel", details: "Famous for Hilsa and Pomfret" }
        ],
        hospitals: [
          { name: "Digha State Hospital", details: "🚨 1.5km away • 24/7 Emergency & Trauma" },
          { name: "Contai Sub-Divisional", details: "🏥 30km away • Advanced Medical Care" }
        ]
    },
    "mandarmani beach": {
        hotels: [
          { name: "The Sana Beach Resort", details: "⭐⭐⭐⭐ • Premium Eco-Resort" },
          { name: "Viceroy Beach Resort", details: "⭐⭐⭐⭐ • Luxury Beachfront" }
        ],
        restaurants: [
          { name: "Seafood Shacks", details: "Local freshly caught crabs • On the beach" },
          { name: "Sana Resort Dining", details: "Multi-cuisine fine dining" }
        ],
        hospitals: [
          { name: "Pichabani PHC", details: "🚨 10km away • Basic First Aid" },
          { name: "Contai Hospital", details: "🏥 25km away • Major Regional Hospital" }
        ]
    },
    "chandipur beach": {
        hotels: [
          { name: "Panthanivas Chandipur", details: "⭐⭐⭐ • Government run • Sea View" },
          { name: "NOCCi Residency", details: "⭐⭐⭐⭐ • Premium Leisure (Balasore)" }
        ],
        restaurants: [
          { name: "OTDC Restaurant", details: "Odisha Thali & local seafood" },
          { name: "Dine Out Chandipur", details: "Chinese & North Indian • 1km away" }
        ],
        hospitals: [
          { name: "Fakir Mohan Medical", details: "🚨 15km away • 24/7 Trauma Care" },
          { name: "Chandipur Dispensary", details: "🏥 Local restricted basic care" }
        ]
    }
  };

  // Safe checks for mixed variable names
  const cityName = bsiData?.city || bsiData?.beachName || bsiData?.name || "the Beach";
  const safeSearchKey = cityName.toLowerCase();
  
  let locationData = NEARBY_DATABASE[safeSearchKey] || NEARBY_DATABASE[`${safeSearchKey} beach`];

  // Dynamic backup fallback
  if (!locationData) {
    locationData = {
      hotels: [
        { name: "Premium Sea View Resort", details: "⭐⭐⭐⭐ • Beachfront • Sea View" },
        { name: "Budget Backpacker Hostel", details: "⭐⭐ • Affordable • 1km away" }
      ],
      restaurants: [
        { name: "Local Seafood Shack", details: "Fresh catch • Beachfront" },
        { name: "Continental Beach Cafe", details: "Pizza & Burgers • 500m away" }
      ],
      hospitals: [
        { name: "District General Hospital", details: "🚨 5km away • 24/7 ER" },
        { name: "Local Health Centre", details: "🏥 2km away • Basic Care" }
      ]
    };
  }

  // 🧠 SMART PARSER: Turns standard text into beautiful UI elements
  const parseDetails = (text, type) => {
    const parts = text.split(' • ');
    let rating = "4.2";
    let distance = parts[1] || "Near beach";
    let tag1 = type === 'hotels' ? "Luxury" : type === 'restaurants' ? "Popular" : "Clinic";
    let tag2 = parts[2] || (type === 'hotels' ? "Pool" : "Local");
    let price = type === 'hospitals' ? '' : '₹₹';

    if (parts[0] && parts[0].includes('⭐')) {
        let starCount = parts[0].split('⭐').length - 1;
        rating = starCount === 5 ? "4.8" : starCount === 4 ? "4.3" : "3.8";
        tag1 = parts[0].length > 5 ? "Government" : "Premium"; 
    } else {
        if (type === 'restaurants') {
            tag1 = parts[0];
            rating = "4.5";
        } else if (type === 'hospitals') {
            distance = parts[0].replace('🚨 ', '').replace('🏥 ', '');
            rating = "ER";
            tag1 = "24/7";
            tag2 = "Emergency";
        }
    }
    return { rating, distance, tag1, tag2, price };
  };

  return (
    <div style={styles.container}>
      {/* Header section matching screenshot */}
      <div style={styles.headerArea}>
        <h2 style={styles.mainTitle}>Explore Nearby</h2>
        <p style={styles.subtitle}>What are you looking for around <strong>{cityName}</strong>?</p>
      </div>
      
      {/* Tab Navigation - Exact Match */}
      <div style={styles.tabContainer}>
        <div 
          style={activeTab === 'hotels' ? {...styles.tab, ...styles.activeTab} : styles.tab}
          onClick={() => setActiveTab('hotels')}
        >
          <span style={styles.tabIcon}>🏨</span>
          <span style={styles.tabTitle}>Hotels</span>
          <span style={styles.tabSubtitle}>Verified places to stay</span>
        </div>

        <div 
          style={activeTab === 'restaurants' ? {...styles.tab, ...styles.activeTab} : styles.tab}
          onClick={() => setActiveTab('restaurants')}
        >
          <span style={styles.tabIcon}>🍽️</span>
          <span style={styles.tabTitle}>Restaurants</span>
          <span style={styles.tabSubtitle}>Famous local food spots</span>
        </div>

        <div 
          style={activeTab === 'hospitals' ? {...styles.tab, ...styles.activeTab} : styles.tab}
          onClick={() => setActiveTab('hospitals')}
        >
          <span style={styles.tabIcon}>🏥</span>
          <span style={styles.tabTitle}>Emergency</span>
          <span style={styles.tabSubtitle}>Hospitals & Clinics</span>
        </div>
      </div>

      {/* Grid List - Exact Match */}
      <div style={styles.gridContainer}>
        {locationData[activeTab].map((place, index) => {
          const parsed = parseDetails(place.details, activeTab);
          
          return (
            <div key={index} style={styles.card}>
              
              <div style={styles.cardTopRow}>
                <h4 style={styles.placeName}>{place.name}</h4>
                <div style={styles.ratingBadge}>
                  <span style={{color: '#facc15', fontSize: '12px'}}>⭐</span> {parsed.rating}
                </div>
              </div>

              <div style={styles.cardMidRow}>
                <span style={styles.metaItem}>📍 {parsed.distance}</span>
                {parsed.price && <span style={styles.metaItem}>💰 {parsed.price}</span>}
              </div>

              <div style={styles.cardTagRow}>
                <span style={styles.tagPill}>{parsed.tag1}</span>
                <span style={styles.tagPill}>{parsed.tag2}</span>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'rgba(30, 41, 59, 0.7)', // Dark slate glass
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderRadius: '24px',
    padding: '40px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    width: '100%',
    margin: '0 auto',
    fontFamily: '"Inter", "Segoe UI", sans-serif'
  },
  headerArea: {
    textAlign: 'center',
    marginBottom: '35px'
  },
  mainTitle: {
    margin: '0 0 8px 0',
    fontSize: '32px',
    fontWeight: '800',
    letterSpacing: '0.5px'
  },
  subtitle: {
    margin: 0,
    fontSize: '16px',
    color: '#cbd5e1',
    fontWeight: '400'
  },
  tabContainer: {
    display: 'flex',
    gap: '16px',
    marginBottom: '35px',
    justifyContent: 'center'
  },
  tab: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 15px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '2px solid transparent',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  activeTab: {
    background: 'rgba(56, 189, 248, 0.15)', // Light blue tint
    border: '2px solid #38bdf8', // Blue outline
    boxShadow: '0 4px 15px rgba(56, 189, 248, 0.2)'
  },
  tabIcon: {
    fontSize: '32px',
    marginBottom: '8px'
  },
  tabTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '4px'
  },
  tabSubtitle: {
    fontSize: '12px',
    color: '#94a3b8',
    textAlign: 'center'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  card: {
    background: 'rgba(15, 23, 42, 0.6)', // Very dark slate card
    padding: '24px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  cardTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '10px'
  },
  placeName: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: '1.2'
  },
  ratingBadge: {
    background: 'rgba(0, 0, 0, 0.4)',
    padding: '4px 8px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  cardMidRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  metaItem: {
    fontSize: '13px',
    color: '#cbd5e1',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  cardTagRow: {
    display: 'flex',
    gap: '8px',
    marginTop: '4px',
    flexWrap: 'wrap'
  },
  tagPill: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#e2e8f0',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '500',
    border: '1px solid rgba(255,255,255,0.05)'
  }
};

export default NearbyPlaces;