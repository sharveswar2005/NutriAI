import re

def process_query(query: str) -> str:
    """
    Process a natural language query and return a rule-based response.
    """
    q = query.lower()

    if re.search(r'\b(muscle|gain|bulk)\b', q):
        return "For muscle gain, focus on a high-protein diet (chicken, eggs, tofu, protein shakes) and maintain a slight calorie surplus of 300-500 kcal/day."
    
    if re.search(r'\b(fat loss|lose weight|cut)\b', q):
        return "For fat loss, maintain a calorie deficit of 300-500 kcal/day. Prioritize lean proteins, high-fiber vegetables, and complex carbohydrates to stay full."

    if re.search(r'\b(low stock|empty)\b', q):
        return "Our insights engine currently marks essential items like Whey Protein and Quinoa as low stock. Check your inventory insights dashboard for details."

    if re.search(r'\b(recommend|suggest|what should i eat)\b', q):
        return "You can use our recommendation system by setting your goal to muscle_gain, fat_loss, or maintenance, and we will calculate your calories and suggest foods!"

    if re.search(r'\b(best seller|most used)\b', q):
        return "Looks like your most used items currently are Chicken Breast and Oats based on recent consumption data."

    return "I'm a simple rule-based AI. You can ask me about diets for 'muscle gain', foods for 'fat loss', or ask to 'show low stock items'."
