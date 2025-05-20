import { useState } from "react";
import { INGREDIENTS } from "@/lib/IngredientData";

const Selectable_INGREDIENTS = Object.keys(INGREDIENTS);

export default function IngredientSelector({ onSelectionChange }) {
  const [inventory, setInventory] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [flashButton, setFlashButton] = useState(null);

  const updateQuantity = (ingredient, amount) => {
    const newInventory = {
      ...inventory,
      [ingredient]: Math.max(0, (inventory[ingredient] || 0) + amount),
    };
    setInventory(newInventory);
    onSelectionChange(newInventory);
  };

  const handleClearAll = () => {
    const cleared = Object.fromEntries(Selectable_INGREDIENTS.map(ing => [ing, 0]));
    setInventory(cleared);
    onSelectionChange(cleared);
    triggerFlash("clear");
  };

  const handleAddOneToAll = () => {
    const updated = Object.fromEntries(Selectable_INGREDIENTS.map(ing => [ing, (inventory[ing] || 0) + 1]));
    setInventory(updated);
    onSelectionChange(updated);
    triggerFlash("add");
  };

  const triggerFlash = (type) => {
    setFlashButton(type);
    setTimeout(() => setFlashButton(null), 200);
  };

  const filteredIngredients = Selectable_INGREDIENTS.filter(ingredient =>
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
          marginBottom: "0.5rem",
          backgroundColor:"#C2B59B",
          color: "#3B2F2F"
        }}
      />

      {/* Control Buttons */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button
          onClick={handleClearAll}
          style={{
            flex: 1,
            backgroundColor: flashButton === "clear" ? '#C2B59B' : '#E6D8C3',
            color: '#3B2F2F',
            border: '1px solid #3B2F2F',
            padding: '0.4rem 0.5rem',
            borderRadius: '0.25rem',
            fontWeight: 'bold',
            transition: 'background-color 0.2s',
          }}
        >
          Clear Ingredients
        </button>
        <button
          onClick={handleAddOneToAll}
          style={{
            flex: 1,
            backgroundColor: flashButton === "add" ? '#C2B59B' : '#E6D8C3',
            color: '#3B2F2F',
            border: '1px solid #3B2F2F',
            padding: '0.4rem 0.5rem',
            borderRadius: '0.25rem',
            fontWeight: 'bold',
            transition: 'background-color 0.2s',
          }}
        >
          Add One to All
        </button>
      </div>

      {/* Scrollable Ingredient List */}
      <div style={{
        maxHeight: "600px",
        minWidth:"400px", //so it does not collapse on searching for none
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