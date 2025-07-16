import React, { useState, useEffect } from 'react';
import { recipes as recipesData } from './recipes.js';
import RecipeCard from './recipeCard.js';
import { fetchWeatherData, getWeatherBasedSeason, getLocationBasedRecommendations } from './weatherService.js';

// Season determination with weather data
const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Autumn";
  return "Winter";
};

function WeatherStatus({ weatherData, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-700">📍 Getting your location for personalized recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-700">⚠️ Using calendar-based seasons (location access denied)</p>
      </div>
    );
  }

  if (weatherData) {
    const temp = Math.round(weatherData.main.temp);
    const condition = weatherData.weather[0].description;
    const location = weatherData.name;
    
    return (
      <div className="mb-4 p-4 bg-green-50 rounded-lg">
        <p className="text-green-700">
          🌡️ Current conditions in {location}: {temp}°C, {condition}
        </p>
        <p className="text-sm text-green-600 mt-1">
          Recommendations adjusted for your local weather
        </p>
      </div>
    );
  }

  return null;
}

function FilterControls({ 
  activeSeason, 
  setActiveSeason, 
  allergenFilters, 
  setAllergenFilters, 
  weatherData,
  weatherRecommendations 
}) {
  const seasons = ["Spring", "Summer", "Autumn", "Winter"];
  const allergens = ["gluten", "dairy", "egg"];

  const handleAllergenChange = (allergen) => {
    const newAllergens = { ...allergenFilters, [allergen]: !allergenFilters[allergen] };
    setAllergenFilters(newAllergens);
  };

  return (
    <div className="mb-8 p-6 rounded-lg bg-white shadow-lg">
      {/* Weather-based suggestions */}
      {weatherRecommendations && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            🌤️ Perfect for today's weather
          </h3>
          <div className="flex flex-wrap gap-2">
            {weatherRecommendations.suggestions.map(suggestion => (
              <span 
                key={suggestion} 
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {suggestion}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Season</h3>
        <div className="flex flex-wrap gap-2">
          {seasons.map(season => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                activeSeason === season
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {season}
              {weatherData && getWeatherBasedSeason(weatherData) === season && (
                <span className="ml-1">🌡️</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Allergies? Find safe alternatives.</h3>
        <div className="flex flex-wrap gap-x-6 gap-y-4">
          {allergens.map(allergen => (
            <label key={allergen} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={allergenFilters[allergen]}
                onChange={() => handleAllergenChange(allergen)}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700 capitalize text-md">{allergen}-Free</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main App component
export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  
  // Weather-related state
  const [weatherData, setWeatherData] = useState(null);
  const [weatherRecommendations, setWeatherRecommendations] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  // Existing state
  const [activeSeason, setActiveSeason] = useState(getCurrentSeason());
  const [allergenFilters, setAllergenFilters] = useState({
    gluten: false,
    dairy: false,
    egg: false,
  });

  // Get user location and fetch weather data
  useEffect(() => {
    const fetchUserWeather = async () => {
      if (!navigator.geolocation) {
        setWeatherError('Geolocation not supported');
        return;
      }

      setWeatherLoading(true);
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const weather = await fetchWeatherData(latitude, longitude);
            
            setWeatherData(weather);
            setWeatherRecommendations(getLocationBasedRecommendations(weather, recipesData));
            
            // Update season based on weather
            const weatherSeason = getWeatherBasedSeason(weather);
            setActiveSeason(weatherSeason);
            
            setWeatherLoading(false);
          } catch (error) {
            setWeatherError('Failed to fetch weather data');
            setWeatherLoading(false);
          }
        },
        (error) => {
          setWeatherError('Location access denied');
          setWeatherLoading(false);
        }
      );
    };

    fetchUserWeather();
  }, []);

  // Load recipes and saved filters
  useEffect(() => {
    setRecipes(recipesData);
    const savedFilters = localStorage.getItem('allergenFilters');
    if (savedFilters) {
      setAllergenFilters(JSON.parse(savedFilters));
    }
  }, []);

  // Filtering logic with weather preferences
  useEffect(() => {
    localStorage.setItem('allergenFilters', JSON.stringify(allergenFilters));
    
    let tempRecipes = recipes.filter(recipe => recipe.season === activeSeason);
    
    // Apply allergen filters
    const activeAllergens = Object.keys(allergenFilters).filter(key => allergenFilters[key]);
    if (activeAllergens.length > 0) {
      tempRecipes = tempRecipes.filter(recipe => {
        return activeAllergens.every(allergen =>
          recipe.substitutions.some(sub => sub.allergen === allergen)
        );
      });
    }

    // Weather-based sorting (if available)
    if (weatherRecommendations) {
      tempRecipes = tempRecipes.sort((a, b) => {
        return 0;
      });
    }

    setFilteredRecipes(tempRecipes);
  }, [activeSeason, allergenFilters, recipes, weatherRecommendations]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Seasonal Dessert Finder
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect dessert for any season, with allergy-friendly options.
          </p>
        </header>

        <WeatherStatus 
          weatherData={weatherData}
          isLoading={weatherLoading}
          error={weatherError}
        />

        <FilterControls
          activeSeason={activeSeason}
          setActiveSeason={setActiveSeason}
          allergenFilters={allergenFilters}
          setAllergenFilters={setAllergenFilters}
          weatherData={weatherData}
          weatherRecommendations={weatherRecommendations}
        />

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                allergenFilters={allergenFilters}
                weatherData={weatherData}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-700">No Recipes Found</h3>
              <p className="text-gray-500 mt-2">Try changing your season or allergen filters!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}