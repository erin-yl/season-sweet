export const recipes = [
  {
    "id": 1,
    "name": "Classic Apple Crumble",
    "season": "Autumn",
    "difficulty": "Easy",
    "image": "https://images.unsplash.com/photo-1570196939432-d3c5114a436e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
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
    ]
  },
  {
    "id": 2,
    "name": "Summer Berry Tart",
    "season": "Summer",
    "difficulty": "Medium",
    "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
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
    ]
  },
  {
    "id": 3,
    "name": "Flourless Chocolate Cake",
    "season": "Winter",
    "difficulty": "Medium",
    "image": "https://images.unsplash.com/photo-1548857908-1cf0c913ccc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
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
        "substitute": "Aquafaba (chickpea brine)",
        "allergen": "egg",
        "confidence": "low",
        "notes": "3 tbsp of aquafaba per egg. This substitution is tricky and may affect the structure."
      }
    ]
  }
]