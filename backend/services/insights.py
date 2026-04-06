from typing import List, Dict, Any

def get_inventory_insights() -> dict:
    """
    Simulate inventory intelligence to find low stock and most used items.
    """
    # Mock Database
    inventory_data: List[Dict[str, Any]] = [
        {"item": "Whey Protein", "stock": 2, "threshold": 5, "sales_volume": 45},
        {"item": "Oats", "stock": 15, "threshold": 10, "sales_volume": 120},
        {"item": "Chicken Breast", "stock": 25, "threshold": 15, "sales_volume": 200},
        {"item": "Quinoa", "stock": 3, "threshold": 8, "sales_volume": 30},
        {"item": "Greek Yogurt", "stock": 12, "threshold": 10, "sales_volume": 85},
    ]

    low_stock = []
    restocking_suggestions = []
    
    for item in inventory_data:
        if item["stock"] < item["threshold"]:
            low_stock.append(item["item"])
            restock_amount = item["threshold"] - item["stock"] + 5 # standard buffer
            restocking_suggestions.append(f"Restock {restock_amount} units of {item['item']}")

    # Most used items based on "sales_volume" or consumption
    sorted_by_sales = sorted(inventory_data, key=lambda x: x["sales_volume"], reverse=True)
    most_used = [item["item"] for item in sorted_by_sales[:2]]

    return {
        "low_stock_items": low_stock,
        "restocking_suggestions": restocking_suggestions,
        "most_used_items": most_used
    }
