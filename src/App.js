import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { recipes as recipesData, generateAIRecipe } from './recipes.js';
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
  
  const currentTheme = seasonalThemes[activeSeason];

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

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>Choose Your Season</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.keys(seasonalThemes).map(season => {
            const theme = seasonalThemes[season];
            const isActive = activeSeason === season;
            return (
              <button
                key={season}
                onClick={() => setActiveSeason(season)}
                className={`p-3 rounded-xl font-medium transition-all duration-200 ${isActive
                  ? `${theme.primary} text-white shadow-sm`
                  : `bg-gray-50 text-gray-700 hover:bg-gray-100`
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>{theme.icon}</span>
                  <span>{season}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>Dietary Preferences</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.keys(allergenFilters).map(allergen => (
            <label
              key={allergen}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${allergenFilters[allergen]
                ? `${currentTheme.accent}`
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
            >
              <input
                type="checkbox"
                checked={allergenFilters[allergen]}
                onChange={() => setAllergenFilters(prev => ({ ...prev, [allergen]: !prev[allergen] }))}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="font-medium capitalize">{allergen}-Free</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main App component
export default function App() {
  const [recipes, setRecipes] = useState(recipesData);
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

  const [isGenerating, setIsGenerating] = useState(false);
  const currentTheme = seasonalThemes[activeSeason];

  const generateNewRecipe = async () => {
    setIsGenerating(true);
    try {
      const activeAllergens = Object.keys(allergenFilters).filter(key => allergenFilters[key]);
      const newRecipe = await generateAIRecipe(activeSeason, activeAllergens);
      setRecipes(prev => [...prev, newRecipe]);
    } catch (error) {
      console.error('Failed to generate recipe:', error);
    } finally {
      setIsGenerating(false);
    }
  };

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
          recipe.substitutions.some(sub => sub.allergen === allergen &&
            (sub.confidence === 'high' || sub.confidence === 'medium')
          )
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
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SeasonSweet
          </h1>
          <div className="flex justify-center items-center gap-2 text-2xl mb-4">
            <span>{currentTheme.icon}</span>
            <span className="text-xl font-semibold text-gray-700">{activeSeason} Desserts</span>
            <span>{currentTheme.icon}</span>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover perfect seasonal desserts with AI-powered recipes and allergen-friendly alternatives.
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

        <div className="flex justify-center">
          <button
            onClick={generateNewRecipe}
            disabled={isGenerating}
            className={`flex items-center gap-2 px-6 py-3 text-white rounded-full font-medium transition-colors ${currentTheme.primary} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating AI Recipe...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate AI Recipe
              </>
            )}
          </button>
        </div>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                allergenFilters={allergenFilters}
                seasonalTheme={currentTheme}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Recipes Found</h3>
              <p className="text-gray-500 mb-4">Try changing your filters or generate a new AI recipe!</p>
              <button
                onClick={generateNewRecipe}
                disabled={isGenerating}
                className={`flex items-center gap-2 px-6 py-3 text-white rounded-full font-medium transition-colors mx-auto ${currentTheme.primary} disabled:opacity-50`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate AI Recipe
                  </>
                )}
              </button>
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