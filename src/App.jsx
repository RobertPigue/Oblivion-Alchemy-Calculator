import { useState, useEffect } from "react";
import IngredientSelector from "@/components/IngredientSelector";
import { createMapping, findPotions } from "@/lib/alchemyengine";

// Generate all skill maps once (1-4)
const skillMaps = [1, 2, 3, 4].map(createMapping);
console.log("Skill 4 Map Example:", skillMaps[3]);

export default function App() {
  const [inventory, setInventory] = useState({});
  const [potions, setPotions] = useState([]);

  useEffect(() => {
    const filteredInventory = Object.fromEntries(
      Object.entries(inventory).filter(([_, qty]) => qty > 0)
    );

    console.log("Filtered Inventory:", filteredInventory);

    const potionsFound = findPotions(filteredInventory, 4, skillMaps);
    console.log("Potions Found:", potionsFound);
    setPotions(potionsFound);
  }, [inventory]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Oblivion Alchemy Calculator</h1>
      
      <IngredientSelector onSelectionChange={setInventory} />

      <div className="border rounded p-4 mt-4">
        <h2 className="text-xl mb-2">Possible Potions:</h2>
        {potions.length > 0 ? (
          <ul className="list-disc pl-5">
            {potions.map((group, index) => (
              <li key={index}>{group.join(", ")}</li>
            ))}
          </ul>
        ) : (
          <p>No valid potions found.</p>
        )}
      </div>
    </div>
  );
}