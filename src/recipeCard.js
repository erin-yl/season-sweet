import React, { useState } from 'react';
import { ChefHat, Sparkles, Clock, ShoppingBasket } from 'lucide-react';

const difficultyColors = {
  'Easy': 'bg-green-100 text-green-800 border-green-200',
  'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Hard': 'bg-red-100 text-red-800 border-red-200'
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

  return (
    <>
      <div
        onClick={openModal}
        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100"
      >
        <div className="relative overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <span className={`flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${seasonalTheme.accent}`}>
              {recipe.season}
            </span>
            <span className={`flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full border backdrop-blur-sm ${difficultyColors[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
            {recipe.isGenerated && (
              <span className={`flex items-center justify-center gap-1 px-2 py-1 text-xs font-medium rounded-full border backdrop-blur-sm bg-purple-50 text-purple-700 border-purple-200`}>
                <Sparkles className="w-3 h-3" />
                AI
              </span>
            )}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
            {recipe.name}
          </h3>

          {anyAllergenFilterActive && (
            <div className="flex flex-wrap gap-1 mb-3">
              {Object.keys(allergenFilters).filter(key => allergenFilters[key]).map(allergen => {
                const hasSubstitution = recipe.substitutions.some(sub => sub.allergen === allergen);
                return (
                  <span
                    key={allergen}
                    className={`inline-flex items-center text-xs px-2 py-1 rounded-full border ${hasSubstitution
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-gray-50 text-gray-500 border-gray-200'
                      }`}
                  >
                    {allergen}-free {hasSubstitution ? '✓' : '✗'}
                  </span>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <ShoppingBasket className="w-4 h-4" />
                {recipe.baseIngredients.length} ingredients
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {recipe.instructions.length} steps
              </span>
            </div>
            <button className={`px-3 py-1 text-xs font-medium text-white rounded-full transition-colors ${seasonalTheme.primary} ${seasonalTheme.hover}`}>
              View Recipe
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{recipe.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${seasonalTheme.accent}`}>
                      {recipe.season}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${difficultyColors[recipe.difficulty]}`}>
                      {recipe.difficulty}
                    </span>
                    {recipe.isGenerated && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border bg-purple-50 text-purple-700 border-purple-200">
                        <Sparkles className="w-3 h-3" />
                        AI Generated
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl font-bold p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {anyAllergenFilterActive && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
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
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <ShoppingBasket className="w-5 h-5" />
                    Ingredients
                  </h4>
                  <div className="space-y-2">
                    {recipe.baseIngredients.map((ing, index) => {
                      const substitution = showSubstitutions
                        ? recipe.substitutions.find(sub => sub.ingredient === ing.name && allergenFilters[sub.allergen])
                        : null;

                      if (substitution) {
                        return (
                          <div key={ing.name} className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-800">
                                {substitution.substitute}
                              </span>
                              <ConfidenceBadge confidence={substitution.confidence} />
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Amount:</span> {ing.quantity}
                            </p>
                            <div className="text-sm text-gray-700 p-2 bg-white rounded border border-yellow-200">
                              <span className="font-medium text-yellow-800">💡 Tip:</span> {substitution.notes}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={ing.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-800">{ing.name}</span>
                            <span className="text-gray-600 text-sm">{ing.quantity}</span>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <ChefHat className="w-5 h-5" />
                    Instructions
                  </h4>
                  <div className="space-y-3">
                    {recipe.instructions.map((step, index) => (
                      <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${seasonalTheme.primary.split(' ')[0]}`}>
                          {index + 1}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  className={`px-4 py-2 text-white rounded-full font-medium transition-colors ${seasonalTheme.primary} ${seasonalTheme.hover}`}
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