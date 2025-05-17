import { useState, useEffect } from "react";
import IngredientSelector from "@/components/IngredientSelector";
import { createMapping, findPotions, labelPotions } from "@/lib/alchemyengine";

// Generate all skill maps once (1-4)
const skillMaps = [1, 2, 3, 4].map(createMapping);

export default function App() {
  const [inventory, setInventory] = useState({});
  const [potions, setPotions] = useState({});

  useEffect(() => {
    const filteredInventory = Object.fromEntries(
      Object.entries(inventory).filter(([_, qty]) => qty > 0)
    );
    const potionsFound = findPotions(filteredInventory, 4, skillMaps);
    const labeled = labelPotions(potionsFound);
    setPotions(labeled);
  }, [inventory]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Oblivion Alchemy Calculator</h1>
      <div className="flex gap-4">
        <div className="flex-1">
          <IngredientSelector onSelectionChange={setInventory} />
        </div>
        <div className="flex-1 border rounded p-4 h-fit">
          <h2 className="text-xl mb-2">Possible Potions:</h2>
          {Object.keys(potions).length > 0 ? (
            <ul className="space-y-2">
              {Object.entries(potions).map(([label, groups], index) => (
                <li key={index}>
                  <strong>{label}</strong>
                  <ul className="list-disc pl-5">
                    {groups.map((group, groupIndex) => (
                      <li key={groupIndex}>{group.join(", ")}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No valid potions found.</p>
          )}
        </div>
      </div>
    </div>
  );
}