import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

// This function maps OpenWeatherMap codes to the icon names
const getIconName = (iconCode) => {
  switch (iconCode) {
    case '01d':
      return 'CLEAR_DAY';
    case '01n':
      return 'CLEAR_NIGHT';
    case '02d':
      return 'PARTLY_CLOUDY_DAY';
    case '02n':
      return 'PARTLY_CLOUDY_NIGHT';
    case '03d':
    case '03n':
      return 'CLOUDY';
    case '04d':
    case '04n':
      return 'CLOUDY'; // 'CLOUDY' is better than 'PARTLY_CLOUDY' for 'broken clouds'
    case '09d':
    case '09n':
      return 'RAIN';
    case '10d':
      return 'RAIN'; // This library doesn't have 'DAY_RAIN'
    case '10n':
      return 'RAIN'; // This library doesn't have 'NIGHT_RAIN'
    case '11d':
    case '11n':
      return 'RAIN'; // Using 'RAIN' for thunderstorm
    case '13d':
    case '13n':
      return 'SNOW';
    case '50d':
    case '50n':
      return 'FOG';
    default:
      return 'CLEAR_DAY';
  }
};

function WeatherIcon({ iconCode, size }) {
  const iconDefaults = {
    icon: getIconName(iconCode),
    color: '#333', // Default color for BSI card (dark)
    size: size || 64, // Default size
    animate: true
  };

  return (
    <ReactAnimatedWeather
      icon={iconDefaults.icon}
      color={iconDefaults.color}
      size={iconDefaults.size}
      animate={iconDefaults.animate}
    />
  );
}

// Special version for the leaderboard cards (white icon)
export function LeaderboardWeatherIcon({ iconCode, size }) {
  const iconDefaults = {
    icon: getIconName(iconCode),
    color: 'white', // White color for the dark card
    size: size || 32,
    animate: true
  };

  return (
    <ReactAnimatedWeather
      icon={iconDefaults.icon}
      color={iconDefaults.color}
      size={iconDefaults.size}
      animate={iconDefaults.animate}
    />
  );
}

export default WeatherIcon; 