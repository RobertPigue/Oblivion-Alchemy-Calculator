import { useState, useEffect } from "react";

export default function PotionDisplay({ potions, selectedEffects }) {
  const [openIndexes, setOpenIndexes] = useState({});
  const [filterByEffects, setFilterByEffects] = useState(false);
  const [filteredPotions, setFilteredPotions] = useState(potions);

  const toggleOpen = (index) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    if (!filterByEffects || selectedEffects.length === 0) {
      setFilteredPotions(potions);
      return;
    }

    const filtered = filterStrictlyByExactEffects(potions, selectedEffects);
    setFilteredPotions(filtered);
  }, [filterByEffects, selectedEffects, potions]);

  return (
    <div
      style={{
        border: "1px solid white",
        padding: "1rem",
        borderRadius: "0.5rem",
        marginBottom: "1rem",
        backgroundColor: "#242424",
        color: "#3B2F2F",
      }}
    >
      <div
        style={{
          maxHeight: "705px",
          minWidth: "400px",
          overflowY: "auto",
          overflowX: "auto",
          maxWidth: "600px",
          paddingRight: "0.5rem",
        }}
      >
        <button
          onClick={() => setFilterByEffects((prev) => !prev)}
          style={{
            backgroundColor: filterByEffects ? "#C2B59B" : "#E6D8C3",
            color: "#3B2F2F",
            border: "1px solid #3B2F2F",
            padding: "0.4rem 0.5rem",
            borderRadius: "0.25rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {filterByEffects ? "Show All Potions" : "Filter by Selected Effects"}
        </button>

        {Object.keys(filteredPotions).length > 0 ? (
          <div style={{ margin: 0, padding: 0 }}>
            {Object.entries(filteredPotions).map(([label, groups], index) => (
              <div
                key={index}
                style={{ margin: 0, padding: 0, marginBottom: "0.25rem" }}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  style={{
                    background: "none",
                    border: "1px solid #3B2F2F",
                    borderRadius: "0",
                    backgroundColor: openIndexes[index]
                      ? "#BFB69E"
                      : "#E2D9C6",
                    color: "#3B2F2F",
                    padding: "0.4rem 0.5rem",
                    fontWeight: "bold",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  {label} ({groups.length}) {openIndexes[index] ? "▲" : "▼"}
                </button>

                {openIndexes[index] && (
                  <ul
                    style={{
                      listStyleType: "disc",
                      listStylePosition: "inside",
                      paddingLeft: "0.1rem",
                      margin: 0,
                    }}
                  >
                    {groups.map((group, groupIndex) => (
                      <li
                        key={groupIndex}
                        style={{
                          backgroundColor: "#E2D9C6",
                          margin: 0,
                          padding: "0.25rem 0.5rem",
                          fontWeight: "bold",
                          color: "#3B2F2F",
                        }}
                      >
                        {group.join(", ")}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#E2D9C6" }}>No valid potions found.</p>
        )}
      </div>
    </div>
  );
}

// -------------------- Strict Filtering Helper -----------------------

function filterStrictlyByExactEffects(labeledPotions, selectedEffects) {
  const selectedSet = new Set(selectedEffects.map(e => e.toLowerCase()));
  const tempArray = [];

  for (const [label, potions] of Object.entries(labeledPotions)) {
    const effects = label
      .replace(" Potion", "")
      .split("+")
      .map(e => e.trim().toLowerCase());

    const allMatch = effects.every((eff) => selectedSet.has(eff));
    const noExtras = effects.length > 0 && selectedSet.size >= effects.length;

    if (allMatch && noExtras) {
      tempArray.push({ label, potions, matchCount: effects.length });
    }
  }

  // ✅ Now sort the array
  tempArray.sort((a, b) => b.matchCount - a.matchCount);

  // ✅ Convert sorted array back into object
  const sortedObj = {};
  tempArray.forEach(({ label, potions }) => {
    sortedObj[label] = potions;
  });

  return sortedObj;
}