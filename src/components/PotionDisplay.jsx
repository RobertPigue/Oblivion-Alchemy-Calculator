import { useState } from "react";

export default function PotionDisplay({ potions }) {
  const [openIndexes, setOpenIndexes] = useState({});

  const toggleOpen = (index) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
      style={{
        border: "1px solid #3B2F2F",
        padding: "1rem",
        borderRadius: "0.5rem",
        marginBottom: "1rem",
        backgroundColor: "#E6D8C3", // Non-selected background color
        color: "#3B2F2F",
      }}
    >
      <div
        style={{
          maxHeight: "600px",
          overflowY: "auto",
          overflowX: "auto",
          maxWidth: "600px",
          paddingRight: "0.5rem",
        }}
      >
        {Object.keys(potions).length > 0 ? (
          <div>
            {Object.entries(potions).map(([label, groups], index) => (
              <div key={index} style={{ marginBottom: "0.5rem" }}>
                <button
                  onClick={() => toggleOpen(index)}
                  style={{
                    background: "none",
                    border: "1px solid #3B2F2F",
                    borderRadius: "0.25rem",
                    backgroundColor: "#E6D8C3",
                    color: "#3B2F2F",
                    padding: "0.4rem 0.5rem",
                    fontWeight: "bold",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseDown={(e) => e.target.style.backgroundColor = "#E6D8C3"}
                  onMouseUp={(e) => e.target.style.backgroundColor = "#C2B59B"}
                >
                  {label} ({groups.length}) {openIndexes[index] ? "▲" : "▼"}
                </button>

                {openIndexes[index] && (
                  <ul
                    style={{
                      listStyleType: "disc",
                      paddingLeft: "1.25rem",
                      marginTop: "0.25rem",
                      fontWeight: "bold",
                    }}
                  >
                    {groups.map((group, groupIndex) => (
                      <li key={groupIndex}>{group.join(", ")}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No valid potions found.</p>
        )}
      </div>
    </div>
  );
}