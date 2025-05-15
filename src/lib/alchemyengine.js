import { EFFECTS, INGREDIENTS } from "./IngredientData";
//This file is for methods that actually do the alchemy


//get effects by skill for one ing
export function getEffectsForIngredient(ingredient, skill = 4) {
  const effects = INGREDIENTS[ingredient] || [];
  return effects.slice(0, Math.min(skill, 4));  // Cuts off by skill level
}
//checks if two ings share an effect by skill
export function shareEffectWithinSkill(ing1, ing2, skill) {
  const ing1Effects = getEffectsForIngredient(ing1, skill);
  const ing2Effects = getEffectsForIngredient(ing2, skill);
  return ing1Effects.some(effect => ing2Effects.includes(effect));
}
//Gets shared effects between two ings by skill
export function getSharedEffectsWithinSkill(ing1, ing2, skill) {
  const ing1Effects = getEffectsForIngredient(ing1, skill);
  const ing2Effects = getEffectsForIngredient(ing2, skill);
  const shared = new Set();

  ing1Effects.forEach(effect => {
    if (ing2Effects.includes(effect)) {
      shared.add(effect);
    }
  });

  return shared;
}
//Creates maps from ingredients to other ingredients it shares effects with
export function createMapping(skill) {
  const map = {};

  for (const ingredient in INGREDIENTS) {
    map[ingredient] = new Set();

    const effects = getEffectsForIngredient(ingredient, skill);

    effects.forEach((effect) => {
      const others = EFFECTS[effect] || [];
      others.forEach((otherIng) => {
        if (otherIng !== ingredient && shareEffectWithinSkill(ingredient, otherIng, skill)) {
          map[ingredient].add(otherIng);
        }
      });
    });
  }

  return map;
}
//Based on ing maps, skill and inventory, find all combos that are potions
export function findPotions(inventory, skill, skillMaps) {
  const map = skillMaps[skill - 1];
  const validGroups = new Set();

  function dfs(path, remainingDepth) {
    if (path.length >= 2 && path.length <= 4) {
      const sortedPath = [...path].sort();  // Sort to ensure uniqueness
      validGroups.add(JSON.stringify(sortedPath));
    }
    if (remainingDepth === 0 || path.length === 4) return;

    const last = path[path.length - 1];
    const neighbors = map[last] || new Set();

    neighbors.forEach((neighbor) => {
      if (inventory.hasOwnProperty(neighbor) && !path.includes(neighbor)) {
        dfs([...path, neighbor], remainingDepth - 1);
      }
    });
  }

  Object.keys(inventory).forEach((ingredient) => {
    dfs([ingredient], 3);  // max depth 3 to make groups up to size 4
  });

  // Convert back to arrays of strings
  return Array.from(validGroups).map(JSON.parse);
}