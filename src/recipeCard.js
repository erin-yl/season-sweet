import React, { useState } from 'react';

const difficultyColors = {
  'Easy': 'bg-green-100 text-green-800 border-green-200',
  'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Hard': 'bg-red-100 text-red-800 border-red-200'
};

const seasonalColors = {
  'Spring': 'bg-green-100 text-green-800 border-green-200',
  'Summer': 'bg-orange-100 text-orange-800 border-orange-200',
  'Autumn': 'bg-amber-100 text-amber-800 border-amber-200',
  'Winter': 'bg-blue-100 text-blue-800 border-blue-200'
};

function ConfidenceBadge({ confidence }) {
  const confidenceStyles = {
    high: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  };

  return (
    <span className={`inline-flex items-center space-x-1 text-xs font-semibold px-2 py-1 rounded-full border ${confidenceStyles[confidence]}`}>
      <span className="capitalize">{confidence} match</span>
    </span>
  );
}

export default function RecipeCard({ recipe, allergenFilters, seasonalTheme }) {
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
        className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100"
      >
        <div className="relative overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/600x400/f8f8f8/ccc?text=Image+Not+Found';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Floating badges */}
          <div className="absolute top-4 right-4 space-y-2">
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${seasonalColors[recipe.season]}`}>
              {recipe.season}
            </span>
            <div className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${difficultyColors[recipe.difficulty]}`}>
              {recipe.difficulty}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
            {recipe.name}
          </h3>

          {/* Allergen indicators */}
          {anyAllergenFilterActive && (
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.keys(allergenFilters).filter(key => allergenFilters[key]).map(allergen => {
                const hasSubstitution = recipe.substitutions.some(sub => sub.allergen === allergen);
                return (
                  <span
                    key={allergen}
                    className={`text-xs px-2 py-1 rounded-full border ${hasSubstitution
                      ? 'bg-green-100 text-green-800 border-green-200'
                      : 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}
                  >
                    {allergen}-free {hasSubstitution ? '✅' : '❌'}
                  </span>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{recipe.baseIngredients.length} ingredients</span>
              <span>•</span>
              <span>{recipe.instructions.length} steps</span>
            </div>
            <button className={`px-4 py-2 text-sm font-medium text-white rounded-full transition-colors ${seasonalTheme.primary} ${seasonalTheme.primaryHover}`}>
              View Recipe
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="relative p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{recipe.name}</h2>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${seasonalColors[recipe.season]}`}>
                      {recipe.season}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${difficultyColors[recipe.difficulty]}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal content */}
            <div className="p-6">
              {/* Allergen toggle */}
              {anyAllergenFilterActive && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div>
                        <span className="font-semibold text-gray-800">Allergen-Friendly Mode</span>
                        <p className="text-sm text-gray-600">Toggle to see ingredient substitutions</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showSubstitutions}
                        onChange={() => setShowSubstitutions(!showSubstitutions)}
                        className="sr-only peer"
                      />
                      <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Ingredients section */}
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                    <span>🥄</span>
                    <span>Ingredients</span>
                  </h4>
                  <div className="space-y-3">
                    {recipe.baseIngredients.map((ing, index) => {
                      const substitution = showSubstitutions
                        ? recipe.substitutions.find(sub => sub.ingredient === ing.name && allergenFilters[sub.allergen])
                        : null;

                      if (substitution) {
                        return (
                          <div key={ing.name} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-800">
                                {substitution.substitute}
                              </span>
                              <ConfidenceBadge confidence={substitution.confidence} />
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Amount:</span> {ing.quantity}
                            </p>
                            <div className="text-sm text-gray-700 p-3 bg-white rounded-lg border border-yellow-200">
                              <span className="font-medium text-yellow-800">💡 Tip:</span> {substitution.notes}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={ing.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="font-medium text-gray-800">{ing.name}</span>
                            <span className="text-gray-600">{ing.quantity}</span>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>

                {/* Instructions section */}
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                    <span>👨‍🍳</span>
                    <span>Instructions</span>
                  </h4>
                  <div className="space-y-4">
                    {recipe.instructions.map((step, index) => (
                      <div key={index} className="flex space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${seasonalTheme.primary}`}>
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button
                  className={`px-6 py-3 text-white rounded-full font-medium transition-colors ${seasonalTheme.primary} ${seasonalTheme.primaryHover}`}
                >
                  Save Recipe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}