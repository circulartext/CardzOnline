import { useEffect, useState } from "react";
import Head from "next/head";

// ALL 50 US States
const STATES = [
  { name: "Alabama", code: "AL" },
  { name: "Alaska", code: "AK" },
  { name: "Arizona", code: "AZ" },
  { name: "Arkansas", code: "AR" },
  { name: "California", code: "CA" },
  { name: "Colorado", code: "CO" },
  { name: "Connecticut", code: "CT" },
  { name: "Delaware", code: "DE" },
  { name: "Florida", code: "FL" },
  { name: "Georgia", code: "GA" },
  { name: "Hawaii", code: "HI" },
  { name: "Idaho", code: "ID" },
  { name: "Illinois", code: "IL" },
  { name: "Indiana", code: "IN" },
  { name: "Iowa", code: "IA" },
  { name: "Kansas", code: "KS" },
  { name: "Kentucky", code: "KY" },
  { name: "Louisiana", code: "LA" },
  { name: "Maine", code: "ME" },
  { name: "Maryland", code: "MD" },
  { name: "Massachusetts", code: "MA" },
  { name: "Michigan", code: "MI" },
  { name: "Minnesota", code: "MN" },
  { name: "Mississippi", code: "MS" },
  { name: "Missouri", code: "MO" },
  { name: "Montana", code: "MT" },
  { name: "Nebraska", code: "NE" },
  { name: "Nevada", code: "NV" },
  { name: "New Hampshire", code: "NH" },
  { name: "New Jersey", code: "NJ" },
  { name: "New Mexico", code: "NM" },
  { name: "New York", code: "NY" },
  { name: "North Carolina", code: "NC" },
  { name: "North Dakota", code: "ND" },
  { name: "Ohio", code: "OH" },
  { name: "Oklahoma", code: "OK" },
  { name: "Oregon", code: "OR" },
  { name: "Pennsylvania", code: "PA" },
  { name: "Rhode Island", code: "RI" },
  { name: "South Carolina", code: "SC" },
  { name: "South Dakota", code: "SD" },
  { name: "Tennessee", code: "TN" },
  { name: "Texas", code: "TX" },
  { name: "Utah", code: "UT" },
  { name: "Vermont", code: "VT" },
  { name: "Virginia", code: "VA" },
  { name: "Washington", code: "WA" },
  { name: "West Virginia", code: "WV" },
  { name: "Wisconsin", code: "WI" },
  { name: "Wyoming", code: "WY" }
];

export default function Home() {
  const [selectedState, setSelectedState] = useState("TX");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/events?state=${selectedState}`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedState]);

  return (
    <>
      <Head>
        <title>Card Events USA</title>
      </Head>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <aside
          style={{
            width: "250px",
            padding: "20px",
            borderRight: "1px solid #ddd",
            overflowY: "auto",
            height: "100vh"
          }}
        >
          <h2>States</h2>
          <input
            placeholder="Search states..."
            style={{
              padding: "8px",
              width: "100%",
              marginBottom: "10px"
            }}
          />
          {STATES.map(state => (
            <div
              key={state.code}
              onClick={() => setSelectedState(state.code)}
              style={{
                cursor: "pointer",
                padding: "8px 0",
                fontWeight:
                  selectedState === state.code ? "bold" : "normal",
                color: selectedState === state.code ? "#0070f3" : "#000"
              }}
            >
              {state.name}
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: "20px" }}>
          <h1>🃏 Card Events USA</h1>
          <h3>Events in {selectedState}</h3>

          <div style={{
            marginBottom: "20px",
            padding: "10px",
            background: "#f0f0f0",
            borderRadius: "8px"
          }}>
            <h4>Click states on the left or map below</h4>
          </div>

          {/* USA SVG Map */}
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Blank_US_Map_borders.svg/1024px-Blank_US_Map_borders.svg.png"
              alt="USA Map"
              style={{
                width: "600px",
                maxWidth: "90%",
                border: "1px solid #ccc",
                borderRadius: "8px"
              }}
            />
            <p style={{ color: "#666", fontSize: "14px" }}>
              Interactive map coming soon — currently shows states only.
            </p>
          </div>

          {/* Events */}
          {loading && <p>Loading events...</p>}
          {!loading && events.length === 0 && (
            <p>No events found. Try Texas or California.</p>
          )}

          {events.map(event => (
            <div
              key={event.id}
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                borderRadius: "6px",
                marginBottom: "10px"
              }}
            >
              <h3>{event.name?.text}</h3>
              <p>📍 {event.venue?.address?.localized_address_display}</p>
              <p>📅 {event.start?.local}</p>
              <a href={event.url} target="_blank">
                View Event
              </a>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}
  );
}
