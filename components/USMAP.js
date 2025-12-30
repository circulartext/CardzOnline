import { useEffect } from "react";

const STATE_PATHS = {
  TX: "M260.5,450.2l-7.7-22.2l-11.1-13.3l-4.4-27.8l-21.1-18.9l-17.8-7.8l-21.1-21.1l-7.8-17.8l-21.1-21.1l-8.9-7.8l-4.4-25.6l-10-5.6l-8.9-3.3l-3.3-6.7l-7.8-5.6l-4.4-4.4l-4.4-6.7l-2.2-10l-8.9-3.3l-8.9-2.2l+8.9-35.6l+10-25.6l+21.1-23.3l+23.3-14.4l+4.4-3.3l+2.2-2.2l+13.3-5.6l+25.6,4.4l+12.2,10l+10,5.6l+16.7,18.9l+27.8,30l+8.9,10l+2.2,10l-1.1,10l-5.6,15.6l-17.8,15.6l-2.2,10l+3.3,12.2l+6.7,3.3l+8.9,3.3l+11.1,8.9l+12.2,11.1l+13.3,16.7l+16.7,25.6l+7.8,12.2l+4.4,15.6l+3.3,7.8l+7.8,3.3l+4.4,11.1l+7.8,12.2l+8.9,8.9l+10,12.2l+7.8,2.2l+5.6-4.4l+8.9,1.1l+2.2,6.7l+3.3,3.3l+2.2,8.9l+7.8,6.7l+2.2,8.9l-5.6,5.6l-3.3,10l-7.8,7.8l-16.7,15.6l-8.9,8.9l-17.8,15.6l-6.7,8.9l-3.3,12.2l-3.3,16.7l-12.2,23.3l-8.9,7.8l-6.7,10l-6.7,6.7l-17.8,17.8l-11.1,11.1l-12.2,12.2l-6.7,6.7l-16.7,16.7l-3.3,8.9l-7.8,7.8l-12.2,12.2L260.5,450.2z",
  CA: "M50,100l10-20l15-25l20-10l30-5l20,5l15,15l10,25l5,20l-5,25l-15,20l-25,10l-25,5l-20-5l-15-15l-10-20L50,100z",
  FL: "M450,500l15-10l20-15l10-25l-5-25l-15-20l-20-10l-15,5l-10,15l-5,20l5,25l15,20L450,500z",
  NY: "M550,150l10-15l15-10l20-5l15,5l10,15l5,20l-5,20l-15,15l-15,5l-20-5l-15-15l-10-15L550,150z",
  IL: "M400,250l15-10l20-5l15,5l10,15l5,20l-5,20l-15,15l-15,5l-20-5l-15-15l-10-20L400,250z"
};

export default function USMap({ selectedState, onSelectState }) {
  useEffect(() => {
    // Add hover effects to SVG paths
    const paths = document.querySelectorAll(".state-path");
    paths.forEach(path => {
      path.addEventListener("mouseenter", function () {
        this.style.fill = "#0070f3";
      });
      path.addEventListener("mouseleave", function () {
        if (this.id !== selectedState) {
          this.style.fill = "#ccc";
        }
      });
    });
  }, [selectedState]);

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <svg
        width="600"
        height="400"
        viewBox="0 0 800 600"
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9"
        }}
      >
        {/* Draw Texas */}
        <path
          id="TX"
          className="state-path"
          d={STATE_PATHS.TX}
          fill={selectedState === "TX" ? "#0070f3" : "#ccc"}
          stroke="#fff"
          strokeWidth="2"
          onClick={() => onSelectState("TX")}
          style={{ cursor: "pointer" }}
        />

        {/* Draw California */}
        <path
          id="CA"
          className="state-path"
          d={STATE_PATHS.CA}
          fill={selectedState === "CA" ? "#0070f3" : "#ccc"}
          stroke="#fff"
          strokeWidth="2"
          onClick={() => onSelectState("CA")}
          style={{ cursor: "pointer" }}
        />

        {/* Draw Florida */}
        <path
          id="FL"
          className="state-path"
          d={STATE_PATHS.FL}
          fill={selectedState === "FL" ? "#0070f3" : "#ccc"}
          stroke="#fff"
          strokeWidth="2"
          onClick={() => onSelectState("FL")}
          style={{ cursor: "pointer" }}
        />

        {/* Draw New York */}
        <path
          id="NY"
          className="state-path"
          d={STATE_PATHS.NY}
          fill={selectedState === "NY" ? "#0070f3" : "#ccc"}
          stroke="#fff"
          strokeWidth="2"
          onClick={() => onSelectState("NY")}
          style={{ cursor: "pointer" }}
        />

        {/* Draw Illinois */}
        <path
          id="IL"
          className="state-path"
          d={STATE_PATHS.IL}
          fill={selectedState === "IL" ? "#0070f3" : "#ccc"}
          stroke="#fff"
          strokeWidth="2"
          onClick={() => onSelectState("IL")}
          style={{ cursor: "pointer" }}
        />

        {/* State Labels */}
        <text x="300" y="280" fontSize="14" fill="#333">Texas</text>
        <text x="100" y="120" fontSize="14" fill="#333">California</text>
        <text x="470" y="460" fontSize="14" fill="#333">Florida</text>
        <text x="600" y="170" fontSize="14" fill="#333">New York</text>
        <text x="430" y="280" fontSize="14" fill="#333">Illinois</text>

        {/* Legend */}
        <text x="20" y="40" fontSize="16" fontWeight="bold" fill="#333">
          Click a State
        </text>
      </svg>
      <p style={{ color: "#666", fontSize: "14px", marginTop: "10px" }}>
        Click states on the map to see events. More states coming soon.
      </p>
    </div>
  );
}
