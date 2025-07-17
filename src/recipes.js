export const recipes = [
  {
    "id": 1,
    "name": "Classic Apple Crumble",
    "season": "Autumn",
    "difficulty": "Easy",
    "image": "https://plus.unsplash.com/premium_photo-1695865414385-f85ca8708762?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "baseIngredients": [
      { "name": "Apples", "quantity": "4 large" },
      { "name": "All-Purpose Flour", "quantity": "1 cup" },
      { "name": "Butter", "quantity": "1/2 cup, cold" },
      { "name": "Brown Sugar", "quantity": "1/2 cup" },
      { "name": "Cinnamon", "quantity": "1 tsp" }
    ],
    "instructions": [
      "Preheat oven to 375°F (190°C).",
      "Peel, core, and slice the apples. Arrange them in a baking dish.",
      "In a separate bowl, mix the flour, brown sugar, and cinnamon.",
      "Cut in the cold butter using a pastry blender or your fingers until the mixture resembles coarse crumbs.",
      "Sprinkle the crumble topping evenly over the apples.",
      "Bake for 30-35 minutes, or until the topping is golden brown and the apples are tender."
    ],
    "allergens": ["gluten", "dairy"],
    "substitutions": [
      {
        "ingredient": "Butter",
        "substitute": "Solid Coconut Oil",
        "allergen": "dairy",
        "confidence": "high",
        "notes": "Use solid, room temperature coconut oil for the best crumbly texture."
      },
      {
        "ingredient": "All-Purpose Flour",
        "substitute": "1-to-1 Gluten-Free Baking Flour",
        "allergen": "gluten",
        "confidence": "high",
        "notes": "A blend containing xanthan gum works best."
      }
    ],
    "weatherPreferences": {
      "cool": 0.9,
      "cold": 0.7,
      "tags": ["comfort", "warming"]
    },
    isAiGenerated: false
  },
  {
    "id": 2,
    "name": "Summer Berry Tart",
    "season": "Summer",
    "difficulty": "Medium",
    "image": "https://images.unsplash.com/photo-1588291258143-d31a5dfe6c30?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "baseIngredients": [
      { "name": "Pie Crust", "quantity": "1 (9-inch)" },
      { "name": "Cream Cheese", "quantity": "8 oz" },
      { "name": "Sugar", "quantity": "1/2 cup" },
      { "name": "Egg", "quantity": "1 large" },
      { "name": "Vanilla Extract", "quantity": "1 tsp" },
      { "name": "Mixed Berries", "quantity": "2 cups" }
    ],
    "instructions": [
      "Preheat oven to 350°F (175°C). Press pie crust into a tart pan.",
      "Beat cream cheese and sugar until smooth. Beat in egg and vanilla.",
      "Spread mixture into the crust. Bake for 20 minutes.",
      "Let cool completely. Arrange fresh berries on top before serving."
    ],
    "allergens": ["gluten", "dairy", "egg"],
    "substitutions": [
      {
        "ingredient": "Pie Crust",
        "substitute": "Gluten-Free Pie Crust",
        "allergen": "gluten",
        "confidence": "medium",
        "notes": "Look for a pre-made one or a mix for best results."
      },
      {
        "ingredient": "Cream Cheese",
        "substitute": "Dairy-Free Cream Cheese (cashew-based)",
        "allergen": "dairy",
        "confidence": "high",
        "notes": "Ensure it's at room temperature to prevent lumps."
      },
      {
        "ingredient": "Egg",
        "substitute": "1 tbsp Ground Flaxseed + 3 tbsp Water",
        "allergen": "egg",
        "confidence": "medium",
        "notes": "Mix and let it sit for 5 minutes to form a gel. Best for binding in baked goods."
      }
    ],
    "weatherPreferences": {
      "hot": 0.9,
      "warm": 0.7,
      "tags": ["refreshing", "light"]
    },
    isAiGenerated: false
  },
  {
    "id": 3,
    "name": "Flourless Chocolate Cake",
    "season": "Winter",
    "difficulty": "Medium",
    "image": "https://images.unsplash.com/photo-1707070026861-ae45cb63d845?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "baseIngredients": [
      { "name": "Bittersweet Chocolate", "quantity": "8 oz" },
      { "name": "Butter", "quantity": "1/2 cup" },
      { "name": "Sugar", "quantity": "3/4 cup" },
      { "name": "Eggs", "quantity": "3 large" },
      { "name": "Cocoa Powder", "quantity": "1/4 cup" }
    ],
    "instructions": [
      "Preheat oven to 375°F (190°C). Grease and flour a round cake pan.",
      "Melt chocolate and butter together in a saucepan over low heat.",
      "Remove from heat, and whisk in sugar, then eggs one at a time.",
      "Stir in cocoa powder until just combined.",
      "Pour batter into the prepared pan and bake for 25-30 minutes.",
      "Let cool before serving. The center will be fudgy."
    ],
    "allergens": ["dairy", "egg"],
    "substitutions": [
      {
        "ingredient": "Butter",
        "substitute": "Melted Coconut Oil",
        "allergen": "dairy",
        "confidence": "high",
        "notes": "Use refined coconut oil to avoid a coconut flavor."
      },
      {
        "ingredient": "Eggs",
        "substitute": "1 tbsp Ground Flaxseed + 3 tbsp Water",
        "allergen": "egg",
        "confidence": "medium",
        "notes": "Mix and let it sit for 5 minutes to form a gel. Best for binding in baked goods."
      }
    ],
    "weatherPreferences": {
      "cool": 0.7,
      "cold": 0.9,
      "tags": ["warming", "rich"]
    },
    isAiGenerated: false
  },
  {
    "id": 4,
    "name": "Spring Lemon Bars",
    "season": "Spring",
    "difficulty": "Easy",
    "image": "https://images.unsplash.com/photo-1628878639854-cdd283c9149b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "baseIngredients": [
      { "name": "All-Purpose Flour", "quantity": "1 cup" },
      { "name": "Butter", "quantity": "1/2 cup, melted" },
      { "name": "Powdered Sugar", "quantity": "1/4 cup" },
      { "name": "Eggs", "quantity": "2 large" },
      { "name": "Granulated Sugar", "quantity": "1 cup" },
      { "name": "Lemon Juice", "quantity": "1/3 cup" }
    ],
    "instructions": [
      "Preheat oven to 350°F (175°C).",
      "For the crust, combine flour, melted butter, and powdered sugar. Press into an 8x8 inch baking pan.",
      "Bake crust for 20 minutes.",
      "For the filling, whisk together eggs, granulated sugar, and lemon juice.",
      "Pour filling over the hot crust.",
      "Bake for another 20-25 minutes, until the center is set. Let cool and dust with more powdered sugar."
    ],
    "allergens": ["gluten", "dairy", "egg"],
    "substitutions": [
      {
        "ingredient": "All-Purpose Flour",
        "substitute": "Gluten-Free All-Purpose Flour",
        "allergen": "gluten",
        "confidence": "high",
        "notes": "Ensure your blend contains xanthan gum for structure."
      },
      {
        "ingredient": "Butter",
        "substitute": "Melted Vegan Butter",
        "allergen": "dairy",
        "confidence": "high",
        "notes": "A good quality vegan butter will provide the best flavor."
      },
      {
        "ingredient": "Eggs",
        "substitute": "Cornstarch Slurry (2 tbsp cornstarch + 2 tbsp water)",
        "allergen": "egg",
        "confidence": "medium",
        "notes": "This will help set the filling, but the texture will be slightly different."
      }
    ],
    "weatherPreferences": {
      "hot": 0.7,
      "warm": 0.9,
      "tags": ["fresh", "fruity"]
    },
    isAiGenerated: false
  }
]

// Generate a new recipe using the Gemini API.
export const generateAIRecipe = async (season, allergens = []) => {
  const allergenText = allergens.length > 0
    ? `The user is allergic to ${allergens.join(', ')}. The recipe must be completely free of these allergens and provide high-quality substitutions.`
    : "The recipe can use common ingredients like gluten, dairy, and eggs.";

  const prompt = `
    You are a creative pastry chef who specializes in seasonal, allergen-friendly desserts.
    Generate a single, unique dessert recipe for the ${season} season.
    ${allergenText}

    Your response MUST be a valid JSON object only, without any markdown formatting or extra text.
    The JSON object must follow this exact structure:
    {
      "name": "Recipe Name",
      "difficulty": "Easy",
      "baseIngredients": [{"name": "Ingredient Name", "quantity": "Amount"}],
      "instructions": ["Step 1.", "Step 2."],
      "allergens": ["gluten", "dairy"],
      "substitutions": [{"ingredient": "Original Ingredient", "substitute": "Substitute", "allergen": "allergen", "confidence": "high", "notes": "Helpful tip."}]
    }

    - 'difficulty' must be one of: "Easy", "Medium", "Hard".
    - 'allergens' should be an array of allergens present in the *original* version of the recipe.
    - 'substitutions' must contain an entry for each allergen specified by the user. 'confidence' must be "high" or "medium".
  `;

  try {
    const response = await fetch('/api/generate-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API error: ${response.statusText} - ${errorData}`);
    }

    const aiRecipeData = await response.json();

    // Assemble the final recipe object for the frontend
    const recipeNameForImage = aiRecipeData.name.split(' ').join('+');

    return {
      id: Date.now(),
      ...aiRecipeData,
      season,
      image: `https://source.unsplash.com/800x600/?${recipeNameForImage},dessert`, // Dynamic Unsplash image
      isGenerated: true,
    };

  } catch (error) {
    console.error("Error generating AI recipe:", error);
    throw error;
  }
};