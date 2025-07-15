import React, { useState, useEffect } from 'react';
import { recipes as recipesData } from './recipes.js';

export default function App() {
  // State to hold all recipes
  const [recipes, setRecipes] = useState([]);
  // State to hold recipes that match the current filters
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // useEffect hook to load the recipe data when the component mounts
  useEffect(() => {
    setRecipes(recipesData);
    setFilteredRecipes(recipesData);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Seasonal Dessert Finder</h1>
          <p className="text-lg text-gray-600">Find the perfect dessert for any season, with allergy-friendly options.</p>
        </header>

        {/* Placeholder for Filter Controls - we will build this next */}
        <div className="mb-8 p-4 rounded-lg bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700">Filters will go here...</h2>
        </div>

        {/* Recipe List */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.name} 
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/f8f8f8/ccc?text=Image+Not+Found'; }}
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">{recipe.name}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mt-2 px-2.5 py-0.5 rounded-full">{recipe.season}</span>
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold mt-2 ml-2 px-2.5 py-0.5 rounded-full">{recipe.difficulty}</span>
                </div>
              </div>
            ))
          ) : (
            // Empty state
            <p className="text-center text-gray-500 col-span-full">No recipes found. Try adjusting your filters!</p>
          )}
        </main>
      </div>
    </div>
  );
}