import { useEffect, useState } from "react";
import Head from "next/head";
import USMap from "../components/USMap";

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
  const [search, setSearch] = useState("");

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

  const filteredStates = STATES.filter(state =>
    state.name.toLowerCase().includes(search.toLowerCase())
  );

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
            height: "100vh",
            backgroundColor: "#f8f9fa"
          }}
        >
          <h2 style={{ color: "#333" }}>States</h2>
          <input
            placeholder="Search states..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "8px",
              width: "100%",
              marginBottom: "15px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
          {filteredStates.map(state => (
            <div
              key={state.code}
              onClick={() => setSelectedState(state.code)}
              style={{
                cursor: "pointer",
                padding: "8px 0",
                fontWeight: selectedState === state.code ? "bold" : "normal",
                color: selectedState === state.code ? "#0070f3" : "#333",
                borderBottom: "1px solid #eee",
                transition: "all 0.2s"
              }}
            >
              {state.name}
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: "20px" }}>
          <header style={{ marginBottom: "20px" }}>
            <h1 style={{ color: "#0070f3" }}>🃏 Card Events USA</h1>
            <p>Find sports card shows, Pokémon events, and TCG tournaments across the United States</p>
          </header>

          <div style={{
            marginBottom: "20px",
            padding: "15px",
            background: "linear-gradient(to right, #0070f3, #00a8ff)",
            borderRadius: "8px",
            color: "white"
          }}>
            <h3 style={{ margin: 0 }}>
              Selected State: <span style={{ fontWeight: "bold" }}>{selectedState}</span>
            </h3>
            <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
              Click a state on the map or in the sidebar to see events
            </p>
          </div>

          {/* Interactive Map */}
          <div style={{
            margin: "20px 0",
            padding: "15px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ marginTop: 0 }}>USA Map</h3>
            <USMap selectedState={selectedState} onSelectState={setSelectedState} />
          </div>

          {/* Events Section */}
          <div style={{
            margin: "20px 0",
            padding: "15px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ marginTop: 0 }}>
              Events in {STATES.find(s => s.code === selectedState)?.name}
            </h3>

            {loading && (
              <p style={{ textAlign: "center", color: "#666" }}>
                Loading events...
              </p>
            )}

            {!loading && events.length === 0 && (
              <p style={{ textAlign: "center", color: "#666" }}>
                No events found for this state. Try Texas or California.
              </p>
            )}

            {events.map(event => (
              <div
                key={event.id}
                style={{
                  border: "1px solid #eaeaea",
                  padding: "15px",
                  borderRadius: "6px",
                  marginBottom: "10px",
                  backgroundColor: "#fafafa"
                }}
              >
                <h4 style={{ margin: "0 0 8px 0", color: "#333" }}>
                  {event.name?.text}
                </h4>
                <p style={{ margin: "4px 0", color: "#555" }}>
                  📍 {event.venue?.address?.localized_address_display || "Location TBA"}
                </p>
                <p style={{ margin: "4px 0", color: "#555" }}>
                  📅 {event.start?.local ? new Date(event.start.local).toLocaleDateString() : "Date TBA"}
                </p>
                <a
                  href={event.url}
                  target="_blank"
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    backgroundColor: "#0070f3",
                    color: "white",
                    borderRadius: "4px",
                    textDecoration: "none",
                    marginTop: "8px"
                  }}
                >
                  View Event Details
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
