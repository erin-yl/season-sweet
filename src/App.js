import React, { useState, useEffect } from 'react';
import { recipes as recipesData } from './recipes.js';
import RecipeCard from './recipeCard.js';

// Helper function to get the current season
const getCurrentSeason = () => {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Autumn";
  return "Winter";
};

// Filter controls component
function FilterControls({ activeSeason, setActiveSeason, allergenFilters, setAllergenFilters }) {
  const seasons = ["Spring", "Summer", "Autumn", "Winter"];
  const allergens = ["gluten", "dairy", "egg"];

  const handleAllergenChange = (allergen) => {
    const newAllergens = { ...allergenFilters, [allergen]: !allergenFilters[allergen] };
    setAllergenFilters(newAllergens);
  };

  return (
    <div className="mb-8 p-6 rounded-lg bg-white shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Season</h3>
        <div className="flex flex-wrap gap-2">
          {seasons.map(season => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${activeSeason === season
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {season}
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

  // State for filters
  const [activeSeason, setActiveSeason] = useState(getCurrentSeason());
  const [allergenFilters, setAllergenFilters] = useState({
    gluten: false,
    dairy: false,
    egg: false,
  });

  // Load recipes and saved allergen filters from localStorage on mount
  useEffect(() => {
    setRecipes(recipesData);
    const savedFilters = localStorage.getItem('allergenFilters');
    if (savedFilters) {
      setAllergenFilters(JSON.parse(savedFilters));
    }
  }, []);

  // Effect to apply filters whenever they change
  useEffect(() => {
    // Save current allergen filters to localStorage
    localStorage.setItem('allergenFilters', JSON.stringify(allergenFilters));
    let tempRecipes = recipes.filter(recipe => recipe.season === activeSeason);
    const activeAllergens = Object.keys(allergenFilters).filter(key => allergenFilters[key]);

    if (activeAllergens.length > 0) {
      tempRecipes = tempRecipes.filter(recipe => {
        // Check if the recipe has a valid substitution for every active allergen filter
        return activeAllergens.every(allergen =>
          recipe.substitutions.some(sub => sub.allergen === allergen)
        );
      });
    }

    setFilteredRecipes(tempRecipes);
  }, [activeSeason, allergenFilters, recipes]);


  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Seasonal Dessert Finder</h1>
          <p className="text-lg text-gray-600">Find the perfect dessert for any season, with allergy-friendly options.</p>
        </header>

        <FilterControls
          activeSeason={activeSeason}
          setActiveSeason={setActiveSeason}
          allergenFilters={allergenFilters}
          setAllergenFilters={setAllergenFilters}
        />

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                allergenFilters={allergenFilters} 
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