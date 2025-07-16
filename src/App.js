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

// Seasonal themes
const seasonalThemes = {
  Spring: {
    gradient: 'from-green-50 via-emerald-50 to-teal-50',
    primary: 'bg-green-600',
    primaryHover: 'hover:bg-green-700',
    accent: 'bg-green-100 text-green-800',
    icon: '🌸',
    colors: {
      bg: 'bg-green-50',
      text: 'text-green-800',
      border: 'border-green-200'
    }
  },
  Summer: {
    gradient: 'from-yellow-50 via-orange-50 to-red-50',
    primary: 'bg-orange-500',
    primaryHover: 'hover:bg-orange-600',
    accent: 'bg-orange-100 text-orange-800',
    icon: '☀️',
    colors: {
      bg: 'bg-orange-50',
      text: 'text-orange-800',
      border: 'border-orange-200'
    }
  },
  Autumn: {
    gradient: 'from-orange-50 via-amber-50 to-yellow-50',
    primary: 'bg-amber-600',
    primaryHover: 'hover:bg-amber-700',
    accent: 'bg-amber-100 text-amber-800',
    icon: '🍂',
    colors: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200'
    }
  },
  Winter: {
    gradient: 'from-blue-50 via-indigo-50 to-purple-50',
    primary: 'bg-indigo-600',
    primaryHover: 'hover:bg-indigo-700',
    accent: 'bg-indigo-100 text-indigo-800',
    icon: '❄️',
    colors: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-800',
      border: 'border-indigo-200'
    }
  }
};

function WeatherStatus({ weatherData, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <p className="text-blue-800 font-medium">Getting your location for personalized recommendations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <span className="text-xl">⚠️</span>
          <p className="text-yellow-800 font-medium">Using calendar-based seasons (location access denied)</p>
        </div>
      </div>
    );
  }

  if (weatherData) {
    const temp = Math.round(weatherData.main.temp);
    const condition = weatherData.weather[0].description;
    const location = weatherData.name;

    return (
      <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <span className="text-xl">🌡️</span>
          <div>
            <p className="text-emerald-800 font-medium">
              Current conditions in {location}: {temp}°C, {condition}
            </p>
            <p className="text-sm text-emerald-600 mt-1">
              Recommendations adjusted for your local weather
            </p>
          </div>
        </div>
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
  const currentTheme = seasonalThemes[activeSeason];

  const handleAllergenChange = (allergen) => {
    const newAllergens = { ...allergenFilters, [allergen]: !allergenFilters[allergen] };
    setAllergenFilters(newAllergens);
  };

  return (
    <div className="mb-10 p-8 rounded-2xl bg-white shadow-lg border border-gray-100">
      {weatherRecommendations && (
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl border border-blue-100">
          <div className="flex items-center space-x-3 mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Perfect for today's weather
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {weatherRecommendations.suggestions.map(suggestion => (
              <span
                key={suggestion}
                className="px-4 py-2 bg-blue-100 text-blue-900 text-sm font-medium rounded-full shadow-sm border border-blue-200"
              >
                {suggestion}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center space-x-2">
          <span>Choose Your Season</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {seasons.map(season => {
            const theme = seasonalThemes[season];
            const isActive = activeSeason === season;
            const isWeatherSeason = weatherData && getWeatherBasedSeason(weatherData) === season;

            return (
              <button
                key={season}
                onClick={() => setActiveSeason(season)}
                className={`relative p-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${isActive
                  ? `${theme.primary} text-white shadow-lg`
                  : `bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-gray-300`
                  }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">{theme.icon}</span>
                  <span>{season}</span>
                </div>
                {isWeatherSeason && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    🌡️
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-5 flex items-center space-x-2">
          <span>Dietary Preferences</span>
        </h3>
        <p className="text-gray-600 mb-4">Select any allergies to see safe alternatives for all recipes</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allergens.map(allergen => (
            <label
              key={allergen}
              className={`flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${allergenFilters[allergen]
                ? `${currentTheme.colors.bg} ${currentTheme.colors.border} ${currentTheme.colors.text}`
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
            >
              <input
                type="checkbox"
                checked={allergenFilters[allergen]}
                onChange={() => handleAllergenChange(allergen)}
                className={`h-5 w-5 rounded border-gray-300 focus:ring-2 focus:ring-offset-2 ${allergenFilters[allergen] ? 'text-indigo-600 focus:ring-indigo-500' : ''
                  }`}
              />
              <span className="font-medium capitalize text-lg">{allergen}-Free</span>
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

  const currentTheme = seasonalThemes[activeSeason];

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
    <div className={`min-h-screen font-sans bg-gradient-to-br ${currentTheme.gradient}`}>
      <div className="container mx-auto px-4 py-8 md:px-8">
        <header className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              SeasonSweet
            </h1>
            <div className="flex justify-center items-center space-x-2 text-3xl mb-4">
              <span>{currentTheme.icon}</span>
              <span className="text-2xl font-semibold text-gray-600">{activeSeason} Desserts</span>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the perfect seasonal dessert with allergy-friendly alternatives that maintain the same delicious flavors and textures.
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
                seasonalTheme={currentTheme}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-3xl font-bold text-gray-700 mb-2">No Recipes Found</h3>
              <p className="text-gray-500 text-lg">Try changing your season or allergen filters!</p>
            </div>
          )}
        </main>

        <footer className="mt-16 text-center text-gray-500">
          <p className="text-sm">Made with ❤️ for dessert lovers everywhere</p>
        </footer>
      </div>
    </div>
  );
}