import { useState } from "react";
import { EFFECTS } from "@/lib/IngredientData";

// -------------- helpers -----------------
const allEffects = Object.keys(EFFECTS);

export default function EffectSelector({ onSelectionChange }) {
    const [selectedEffects, setSelectedEffects] = useState([]);

    const toggleEffect = (effect) => {
        const updated = selectedEffects.includes(effect)
            ? selectedEffects.filter((e) => e !== effect)
            : [...selectedEffects, effect];

        console.log("Selected Effects:", updated);  // <--- Added log here

        setSelectedEffects(updated);
        onSelectionChange(updated);
    };

    // -------------- UI -----------------
    return (
  <div className="space-y-2 border p-4 rounded mb-4">
    <h2 className="text-xl mb-2">Filter by Desired Effects:</h2>

    <div className="flex flex-col gap-2">
      {allEffects.map((effect) => {
        const selected = selectedEffects.includes(effect);

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
              transition: 'background-color 0.2s, border-color 0.2s',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
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
            {effect}
          </button>
        );
      })}
    </div>
  </div>
);
}