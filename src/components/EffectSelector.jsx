import { useState } from "react";
import { EFFECTS } from "@/lib/IngredientData";
import { countEffectsInInventory } from "@/lib/alchemyengine";

// -------------- helpers -----------------
const allEffects = Object.keys(EFFECTS);

export default function EffectSelector({ onSelectionChange, inventory }) {
  const [selectedEffects, setSelectedEffects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleEffect = (effect) => {
    const updated = selectedEffects.includes(effect)
      ? selectedEffects.filter((e) => e !== effect)
      : [...selectedEffects, effect];

    console.log("Selected Effects:", updated);
    setSelectedEffects(updated);
    onSelectionChange(updated);
  };

  const filteredEffects = allEffects.filter((effect) =>
    effect.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count how many ingredients with each effect are currently in inventory
  const effectCounts = countEffectsInInventory(inventory);

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search effects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "80%",
          padding: "0.4rem",
          border: "1px solid #ccc",
          borderRadius: "0.25rem",
          marginBottom: "1rem",
          backgroundColor:"#C2B59B",
          color: "#3B2F2F"
        }}
      />

      {/* Scrollable Effects List */}
      <div style={{ maxHeight: "660px", minWidth: "270px", overflowY: "auto", border: "1px solid grey", paddingRight: "0.5rem" }}>
        {filteredEffects.length > 0 ? (
          filteredEffects.map((effect) => {
            const selected = selectedEffects.includes(effect);
            const count = effectCounts[effect] || 0;

            return (
              <button
                key={effect}
                onClick={() => toggleEffect(effect)}
                style={{
                  backgroundColor: selected ? '#C2B59B' : '#E6D8C3',
                  color: '#3B2F2F',
                  border: '1px solid #3B2F2F',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  textAlign: 'left',
                  width: '100%',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: '40px',
                  height: '40px',
                  marginBottom: '0.0rem',
                  transition: 'background-color 0.2s, border-color 0.2s',
                }}
              >
                {selected ? (
                  <img
                    src="/Oblivion-Checkmark.png"
                    alt="selected"
                    style={{
                      width: '25px',
                      height: '25px',
                      marginRight: '0.25rem',
                      position: 'relative',
                      top: '2px',
                    }}
                  />
                ) : (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '25px',
                      height: '25px',
                      marginRight: '0.25rem',
                      visibility: 'hidden',
                    }}
                  >
                    ✓
                  </span>
                )}
                {effect}{count > 0 ? ` (${count})` : ""}
              </button>
            );
          })
        ) : (
          <p>No effects match your search.</p>
        )}
      </div>
    </div>
  );
}