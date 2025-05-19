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
    <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "0.5rem" }}>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search ingredients..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "80%",
          minHeight: "50",
          padding: "0.4rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
          marginBottom: "1rem",
        }}
      />

      {/* Scrollable Ingredient List */}
      <div style={{
        maxHeight: "600px",
        overflowY: "auto",
        border: "1px solid grey",
        padding: "0.5rem",
      }}>
        {filteredIngredients.length > 0 ? (
          filteredIngredients.map((ingredient) => {
            const quantity = inventory[ingredient] || 0;
            const isSelected = quantity > 0;

            return (
              <div
                key={ingredient}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto auto",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: isSelected ? '#C2B59B' : '#E6D8C3',
                  color: '#3B2F2F',
                  border: '1px solid #3B2F2F',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  fontWeight: 'bold',
                  minHeight: '20px',
                  height: '20px',
                  marginBottom: "0.0rem",
                }}
              >
                <span style={{ textAlign: "right" }}>{ingredient}</span>
                <button
                  onClick={() => updateQuantity(ingredient, -1)}
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', lineHeight: '1' }}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => updateQuantity(ingredient, 1)}
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', lineHeight: '1' }}
                >
                  +
                </button>
              </div>
            );
          })
        ) : (
          <p>No ingredients match your search.</p>
        )}
      </div>
    </div>
  );
}