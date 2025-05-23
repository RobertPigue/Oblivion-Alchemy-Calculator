import { useState, useEffect } from "react";
import IngredientSelector from "@/components/IngredientSelector";
import EffectSelector from "@/components/EffectSelector";
import PotionDisplay from "@/components/PotionDisplay";
import { createMapping, findPotions, labelPotions } from "@/lib/alchemyengine";

// Pre-generate all skill maps (1-4)
const skillMaps = [1, 2, 3, 4].map(createMapping);

export default function App() {
  const [inventory, setInventory] = useState({});
  const [selectedEffects, setSelectedEffects] = useState([]);
  const [potions, setPotions] = useState({});

  // Pure Original Logic for Potions (no effect filtering)
  useEffect(() => {
    const filteredInventory = Object.fromEntries(
      Object.entries(inventory).filter(([_, qty]) => qty > 0)
    );

    const potionsFound = findPotions(filteredInventory, 4, skillMaps, selectedEffects);
    const labeled = labelPotions(potionsFound);
    setPotions(labeled);
  }, [inventory, selectedEffects]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-petrock mb-4">Oblivion Alchemy Calculator</h1>

      {/* Horizontal 3-Panel Layout */}
      <div className="flex gap-10">
        {/* Left: Ingredient Selector */}
        <div className="flex-1 border rounded p-4">
          <h2 className="text-xl mb-2">Ingredients</h2>
          <IngredientSelector onSelectionChange={setInventory} />
        </div>

        {/* Center: Effect Selector (UI Only) */}
        <div className="flex-1 border rounded p-4">
          <h2 className="text-xl mb-2">Filters</h2>
          <EffectSelector onSelectionChange={setSelectedEffects} inventory={inventory} />
        </div>

        {/* Right: Potions */}
        <div className="flex-1 border rounded p-4">
          <h2 className="text-xl mb-2">Possible Potions</h2>
          <PotionDisplay potions={potions} selectedEffects={selectedEffects} />
        </div>
      </div>
    </div>
  );
}