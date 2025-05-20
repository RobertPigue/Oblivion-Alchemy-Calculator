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
          minWidth:"400px",
          overflowY: "auto",
          overflowX: "auto",
          maxWidth: "600px",
          paddingRight: "0.5rem",
        }}
      >
        {Object.keys(potions).length > 0 ? (
          <div style={{ margin: 0, padding: 0 }}>
            {Object.entries(potions).map(([label, groups], index) => (
              <div key={index} style={{ margin: 0, padding: 0, marginBottom: "0.25rem", }}>
                <button
                  onClick={() => toggleOpen(index)}
                  style={{
                    background: "none",
                    border: "1px solid #3B2F2F",
                    borderRadius: "0",
                    backgroundColor: openIndexes[index] ? "#BFB69E" : "#E2D9C6",
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
                      listStyleType: "disc", // Restores bullet points
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
                          color: "#3B2F2F", // Readable text on light background
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
