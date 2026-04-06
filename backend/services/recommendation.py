def get_recommendation(weight_kg: float, goal: str) -> dict:
    """
    Calculate rough caloric needs and suggest foods based on weight and goal.
    goal can be: 'fat_loss', 'muscle_gain', 'maintenance'
    """
    # Simple rule of thumb: weight (kg) * 22 for BMR roughly 
    # and multiply by an activity factor (assume 1.55 for moderate)
    maintenance_cals = weight_kg * 22 * 1.55
    
    if goal == "fat_loss":
        target_calories = maintenance_cals - 500
        suggestions = ["Chicken breast", "Broccoli", "Egg whites", "Spinach", "Greek yogurt"]
    elif goal == "muscle_gain":
        target_calories = maintenance_cals + 400
        suggestions = ["Salmon", "Sweet potatoes", "Whole eggs", "Oats", "Whey protein", "Beef"]
    else: # maintenance
        target_calories = maintenance_cals
        suggestions = ["Mixed nuts", "Brown rice", "Chicken thighs", "Avocado", "Mixed berries"]
        
    return {
        "calorie_estimation": round(float(target_calories), 2),
        "food_suggestions": suggestions
    }
