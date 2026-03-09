import random

def adjust_calories_for_age(base_calories, age):
    """Adjust base calories based on child growth stage."""
    if age <= 3:
        return base_calories * 0.8
    elif 4 <= age <= 6:
        return base_calories * 0.9
    elif 7 <= age <= 12:
        return base_calories * 1.0
    else:  # teens
        return base_calories * 1.1

def get_meal_datasets():
    """Child-friendly datasets organized by age groups and meal types."""
    
    # 1-3 years: Toddlers (soft foods, mashed, high nutrients)
    toddler_meals = {
        "breakfast": [
            {"name": "Mashed Banana with Soft Oats", "veg": True, "nut_free": True},
            {"name": "Soft Idli with Mashable Sambar", "veg": True, "nut_free": True},
            {"name": "Scrambled Egg Yolk with Soft Toast", "veg": False, "nut_free": True},
            {"name": "Apple Puree with Milk", "veg": True, "nut_free": True}
        ],
        "lunch": [
            {"name": "Moong Dal Khichdi (Mashed)", "veg": True, "nut_free": True},
            {"name": "Mashed Sweet Potato and Curd", "veg": True, "nut_free": True},
            {"name": "Soft Rice with Spinach Dal", "veg": True, "nut_free": True},
            {"name": "Pureed Chicken Soup with Soft Rice", "veg": False, "nut_free": True}
        ],
        "dinner": [
            {"name": "Very Soft Dosa with Curd", "veg": True, "nut_free": True},
            {"name": "Soft Veggie Soup (Carrot/Pumpkin)", "veg": True, "nut_free": True},
            {"name": "Mashed Paneer with Soft Rice", "veg": True, "nut_free": True}
        ],
        "snacks": [
            {"name": "Mashed Papaya", "veg": True, "nut_free": True},
            {"name": "Soft Yogurt", "veg": True, "nut_free": True},
            {"name": "Mashed Avocado", "veg": True, "nut_free": True}
        ]
    }

    # 4-6 & 7-12 years: Growing Children (balanced meals, fun textures)
    child_meals = {
         "breakfast": [
            {"name": "Idli with Mild Sambar & Chutney", "veg": True, "nut_free": False},
            {"name": "Oats Porridge with Chopped Apple", "veg": True, "nut_free": True},
            {"name": "Peanut Butter Sandwich", "veg": True, "nut_free": False},
            {"name": "Scrambled Eggs and Toast", "veg": False, "nut_free": True},
            {"name": "Poha with Peas and Carrots", "veg": True, "nut_free": False}
        ],
        "lunch": [
            {"name": "Rice and Dal (Lentils) with Carrots", "veg": True, "nut_free": True},
            {"name": "Vegetable Khichdi with Curd", "veg": True, "nut_free": True},
            {"name": "Chapati with Paneer Butter Masala", "veg": True, "nut_free": False},
            {"name": "Chicken Curry with Rice", "veg": False, "nut_free": True},
            {"name": "Curd Rice with Pomegranate", "veg": True, "nut_free": True}
        ],
        "dinner": [
            {"name": "Vegetable Pulao with Raita", "veg": True, "nut_free": True},
            {"name": "Chapati with Mixed Vegetable Curry", "veg": True, "nut_free": True},
            {"name": "Dal Rice with Soft Boiled Veggies", "veg": True, "nut_free": True},
            {"name": "Grilled Fish with Mashed Potatoes", "veg": False, "nut_free": True}
        ],
        "snacks": [
            {"name": "Sliced Fruits (Banana/Apple)", "veg": True, "nut_free": True},
            {"name": "Yogurt with Berries", "veg": True, "nut_free": True},
            {"name": "Boiled Sweet Corn", "veg": True, "nut_free": True},
            {"name": "Mixed Nuts (Almonds/Walnuts)", "veg": True, "nut_free": False},
            {"name": "Cheese Cubes", "veg": True, "nut_free": True}
        ]
    }

    # 13-18 years: Teens (higher protein, bigger portions)
    teen_meals = {
         "breakfast": [
            {"name": "High-Protein Oats with Nuts & Protein Powder", "veg": True, "nut_free": False},
            {"name": "3-Egg Omelet with Whole Wheat Toast", "veg": False, "nut_free": True},
            {"name": "Large Peanut Butter & Banana Smoothie", "veg": True, "nut_free": False},
            {"name": "Masala Dosa with Sambar", "veg": True, "nut_free": False},
            {"name": "Stuffed Paneer Paratha with Curd", "veg": True, "nut_free": True}
        ],
        "lunch": [
            {"name": "Large Portion Rice, Dal Tadka, and Mixed Veg", "veg": True, "nut_free": True},
            {"name": "3 Chapatis with Paneer Tikka Masala", "veg": True, "nut_free": False},
            {"name": "Chicken Biryani with Raita", "veg": False, "nut_free": True},
            {"name": "Quinoa Salad with Chickpeas and Tofu", "veg": True, "nut_free": True},
            {"name": "Egg Curry with Rice", "veg": False, "nut_free": True}
        ],
        "dinner": [
            {"name": "Grilled Chicken Breast with Roasted Sweet Potato", "veg": False, "nut_free": True},
            {"name": "Soya Chunk Curry with Chapati", "veg": True, "nut_free": True},
            {"name": "Large Vegetable Fried Rice (Low Oil)", "veg": True, "nut_free": True},
            {"name": "Lentil Soup with Multigrain Bread", "veg": True, "nut_free": True}
        ],
        "snacks": [
            {"name": "Handful of Mixed Almonds and Walnuts", "veg": True, "nut_free": False},
            {"name": "Greek Yogurt with Granola", "veg": True, "nut_free": False},
            {"name": "Protein Shake (Milk + Whey/Plant Protein)", "veg": True, "nut_free": True},
            {"name": "Roasted Makhana (Fox Nuts)", "veg": True, "nut_free": True},
            {"name": "Peanut Butter on Apple Slices", "veg": True, "nut_free": False}
        ]
    }

    return toddler_meals, child_meals, teen_meals

def get_meal(options, is_veg, is_nut_free):
    filtered = [m["name"] for m in options if (not is_veg or m.get("veg", True)) and (not is_nut_free or m.get("nut_free", True))]
    if not filtered:
        return options[0]["name"]
    return random.choice(filtered)

def generate_meal_plan(age, calories, is_veg, is_nut_free):
    toddler_meals, child_meals, teen_meals = get_meal_datasets()

    if age <= 3:
        datasets = toddler_meals
        plan_type = f"Toddler Growth Plan ({age} yrs)"
    elif 4 <= age <= 12:
        datasets = child_meals
        plan_type = f"Child Growth Plan ({age} yrs)"
    else:
        datasets = teen_meals
        plan_type = f"Teen Development Plan ({age} yrs)"

    meals = {
        "breakfast": f"{get_meal(datasets['breakfast'], is_veg, is_nut_free)} ({int(calories * 0.25)} kcal)",
        "lunch": f"{get_meal(datasets['lunch'], is_veg, is_nut_free)} ({int(calories * 0.35)} kcal)",
        "dinner": f"{get_meal(datasets['dinner'], is_veg, is_nut_free)} ({int(calories * 0.30)} kcal)",
        "snacks": f"{get_meal(datasets['snacks'], is_veg, is_nut_free)} ({int(calories * 0.10)} kcal)"
    }

    return meals, plan_type

def calculate_nutrition_score(health_status, is_veg):
    nutrition_score = 85
    if is_veg:
        nutrition_score -= 2
    if health_status in ["Underweight", "Obese"]:
        nutrition_score -= 15
    elif health_status == "Overweight":
        nutrition_score -= 10
    
    return max(0, min(100, nutrition_score))

def generate_parent_guidance(age, health_status, is_veg):
    parent_guidance = [
        "Include dairy products or calcium alternatives daily."
    ]
    
    if age <= 3:
        parent_guidance.append("Ensure foods are soft or mashed to prevent choking hazards.")
        parent_guidance.append("Avoid added sugars and highly processed salt.")
    elif 4 <= age <= 12:
        parent_guidance.append("Encourage drinking at least 4-6 cups of water daily.")
        parent_guidance.append("Make meals colorful with variety of vegetables.")
    else: # teens
        parent_guidance.append("Encourage drinking 8+ cups of water daily.")
        parent_guidance.append("Ensure adequate protein intake to support rapid growth spurts.")

    if health_status == "Underweight":
        parent_guidance.append("Add calorie-dense foods like peanut butter, cheese, or nuts to snacks.")
    elif health_status in ["Overweight", "Obese"]:
        parent_guidance.append("Limit sugary snacks and encourage 60+ minutes of active play.")
    else:
        parent_guidance.append("Maintain the current balanced diet with plenty of colorful vegetables.")
        
    if is_veg:
        parent_guidance.append("Ensure adequate protein intake with paneer, lentils, and dairy.")

    return parent_guidance
