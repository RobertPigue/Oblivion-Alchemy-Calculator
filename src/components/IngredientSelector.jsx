import { useState } from "react";
import { Button } from "@/ui/button";  // If you have shadcn button
import { INGREDIENTS, EFFECTS } from "@/lib/IngredientData";
//import { EFFECTS, INGREDIENTS } from "../lib/IngredientData";
// Example list, replace with your real data or import from lib

const Selectable_INGREDIENTS = Object.keys(INGREDIENTS)

export default function IngredientSelector({ onSelectionChange }) {
  const [inventory, setInventory] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const updateQuantity = (ingredient, amount) => {
    const newInventory = {
      ...inventory,
      [ingredient]: Math.max(0, (inventory[ingredient] || 0) + amount),
    };
    setInventory(newInventory);
    onSelectionChange(newInventory);
  };

  const filteredIngredients = Selectable_INGREDIENTS.filter((ingredient) =>
    ingredient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-2 max-h-[600px] overflow-y-auto border p-4 rounded">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search ingredients..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Filtered Ingredient List */}
      {filteredIngredients.length > 0 ? (
        filteredIngredients.map((ingredient) => (
          <div key={ingredient} className="flex items-center justify-between">
            <span>{ingredient}</span>
            <div className="flex items-center space-x-2">
              <Button onClick={() => updateQuantity(ingredient, -1)}>-</Button>
              <span>{inventory[ingredient] || 0}</span>
              <Button onClick={() => updateQuantity(ingredient, 1)}>+</Button>
            </div>
          </div>
        ))
      ) : (
        <p>No ingredients match your search.</p>
      )}
    </div>
  );
}