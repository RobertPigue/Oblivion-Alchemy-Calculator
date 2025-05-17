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
                            /*  
                               border-2   – consistent 2 px width for everyone  
                               outline-none focus:ring-0 – kill default focus ring  
                            */
                            className={`effect-button p-2 rounded text-left transition border-3 outline-none focus:ring-0
  ${selected
    ? "bg-blue-600 !text-red !border-white"
    : "bg-gray-800 !text-orange-100 !border-gray-600 hover:bg-gray-700"
  }`}
                        >
                            {selected && <span className="mr-1">✓</span>}
                            {effect}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}