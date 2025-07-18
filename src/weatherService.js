export const getWeatherBasedSeason = (weatherData) => {
  const { main, weather } = weatherData;
  const temp = main.temp;
  const condition = weather[0].main;
  const month = new Date().getMonth();

  // Temperature thresholds (in Celsius)
  const COLD_THRESHOLD = 10;
  const WARM_THRESHOLD = 25;
  const HOT_THRESHOLD = 30;

  // Base season from calendar (fallback)
  let baseSeason;
  if (month >= 2 && month <= 4) baseSeason = "Spring";
  else if (month >= 5 && month <= 7) baseSeason = "Summer";
  else if (month >= 8 && month <= 10) baseSeason = "Autumn";
  else baseSeason = "Winter";

  // Weather-influenced season adjustment
  if (temp < COLD_THRESHOLD) {
    return "Winter";
  } else if (temp > HOT_THRESHOLD) {
    return "Summer";
  } else if (temp > WARM_THRESHOLD && (condition === 'Clear' || condition === 'Clouds')) {
    return month >= 6 && month <= 8 ? "Summer" : "Spring";
  }

  // For moderate temperatures, factor in precipitation
  if (condition === 'Rain' || condition === 'Drizzle') {
    return baseSeason === "Summer" ? "Spring" : baseSeason;
  }

  return baseSeason;
};

export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await fetch('/api/get-weather', { // Call our secure backend endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latitude, longitude }),
    });
    
    if (!response.ok) {
      throw new Error('Weather API request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw error;
  }
};

export const getLocationBasedRecommendations = (weatherData) => {
  const temp = weatherData.main.temp;
  const condition = weatherData.weather[0].main;
  
  // Temperature-based dessert preferences
  const recommendations = {
    hot: ['frozen', 'cold', 'refreshing', 'light'],
    warm: ['seasonal', 'fresh', 'fruity'],
    cool: ['warming', 'spiced', 'comfort'],
    cold: ['hot', 'warming', 'rich', 'indulgent']
  };

  let tempCategory;
  if (temp > 25) tempCategory = 'hot';
  else if (temp > 15) tempCategory = 'warm';
  else if (temp > 5) tempCategory = 'cool';
  else tempCategory = 'cold';

  // Add weather-specific suggestions to your recipe metadata
  return {
    tempCategory,
    suggestions: recommendations[tempCategory],
    condition: condition.toLowerCase()
  };
};