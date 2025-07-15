import React, { useState } from 'react';

function ConfidenceBadge({ confidence }) {
  const confidenceStyles = {
    high: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${confidenceStyles[confidence]}`}>
      {confidence} match
    </span>
  );
}

export default function RecipeCard({ recipe, allergenFilters }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSubstitutions, setShowSubstitutions] = useState(false);

  // Determine if any allergen filters are active
  const anyAllergenFilterActive = Object.values(allergenFilters).some(v => v);

  const openModal = () => {
    setShowSubstitutions(anyAllergenFilterActive);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Card summary */}
      <div
        onClick={openModal}
        className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
      >
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/f8f8f8/ccc?text=Image+Not+Found'; }}
        />
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
          <div className="flex items-center space-x-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">{recipe.season}</span>
            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">{recipe.difficulty}</span>
          </div>
        </div>
      </div>

      {/* Modal - The detailed view */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{recipe.name}</h2>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-3xl font-bold">&times;</button>
              </div>

              {anyAllergenFilterActive && (
                <div className="bg-gray-100 p-4 rounded-lg mb-4 flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Allergen-Friendly Mode</span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={showSubstitutions} onChange={() => setShowSubstitutions(!showSubstitutions)} className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ingredients list */}
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-800">Ingredients</h4>
                  <ul className="space-y-2 text-gray-700">
                    {recipe.baseIngredients.map(ing => {
                      const substitution = showSubstitutions
                        ? recipe.substitutions.find(sub => sub.ingredient === ing.name && allergenFilters[sub.allergen])
                        : null;

                      if (substitution) {
                        return (
                          <li key={ing.name} className="p-2 bg-yellow-50 rounded-md">
                            <span className="font-bold">{substitution.substitute}</span> ({ing.quantity})
                            <ConfidenceBadge confidence={substitution.confidence} />
                            <p className="text-xs text-gray-600 mt-1 pl-2 border-l-2 border-yellow-300">{substitution.notes}</p>
                          </li>
                        );
                      } else {
                        return <li key={ing.name}>{ing.quantity} {ing.name}</li>;
                      }
                    })}
                  </ul>
                </div>

                {/* Instructions list */}
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-800">Instructions</h4>
                  <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                    {recipe.instructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}