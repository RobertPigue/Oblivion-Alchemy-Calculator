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
//filtered version
export function shareEffectWithinSkillFiltered(ing1, ing2, skill, desiredEffects) {
  const ing1Effects = getEffectsForIngredient(ing1, skill);
  const ing2Effects = getEffectsForIngredient(ing2, skill);

  return ing1Effects.some(effect => ing2Effects.includes(effect) && desiredEffects.includes(effect));
}

// Creates filtered mapping based on desired effects
export function createFilteredMapping(skill, desiredEffects) {
  const map = {};

  for (const ingredient in INGREDIENTS) {
    map[ingredient] = new Set();

    const effects = getEffectsForIngredient(ingredient, skill);

    effects.forEach((effect) => {
      if (!desiredEffects.includes(effect)) return;  // Skip effects not in desired
      const others = EFFECTS[effect] || [];
      others.forEach((otherIng) => {
        if (otherIng !== ingredient && shareEffectWithinSkillFiltered(ingredient, otherIng, skill, desiredEffects)) {
          map[ingredient].add(otherIng);
        }
      });
    });
  }

  return map;
}
export function labelPotions(potions) {
  const labeled = {};

  potions.forEach((potion) => {
    const effectCounts = {};

    // Count effects from all ingredients
    potion.forEach((ingredient) => {
      const effects = INGREDIENTS[ingredient] || [];
      effects.forEach((effect) => {
        effectCounts[effect] = (effectCounts[effect] || 0) + 1;
      });
    });

    // Gather effects that appear in at least two ingredients
    const sharedEffects = Object.keys(effectCounts).filter(
      (effect) => effectCounts[effect] >= 2
    );

    const numberOfEffects = sharedEffects.length;
    const maxAllowedIngredients = numberOfEffects + 1;

    // Filter out oversized recipes
    if (potion.length > maxAllowedIngredients) return;

    const sortedEffects = sharedEffects.sort();
    const label = sortedEffects.length > 0
      ? `${sortedEffects.join("+")} Potion`
      : "Unnamed Potion";

    if (!labeled[label]) {
      labeled[label] = [];
    }
    labeled[label].push(potion);
  });
  //sort by ingredient count within each potion
  for (const label in labeled) {
    labeled[label].sort((a, b) => a.length - b.length);
  }

  return labeled;
}