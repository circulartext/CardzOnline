import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const [stateCode, setStateCode] = useState("TX");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`/api/events?state=${stateCode}`)
      .then(res => res.json())
      .then(data => setEvents(data));
  }, [stateCode]);

  return (
    <>
      <Head>
        <title>Card Events USA</title>
      </Head>

      <main style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>🃏 Card Events USA</h1>

        <label>
          Select State:&nbsp;
          <select
            value={stateCode}
            onChange={e => setStateCode(e.target.value)}
          >
            <option value="TX">Texas</option>
            <option value="CA">California</option>
            <option value="FL">Florida</option>
            <option value="NY">New York</option>
            <option value="IL">Illinois</option>
          </select>
        </label>

        <h2 style={{ marginTop: "20px" }}>
          Events in {stateCode}
        </h2>

        {events.length === 0 && <p>No events found.</p>}

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
            <a href={event.url} target="_blank">View Event</a>
          </div>
        ))}
      </main>
    </>
  );
}
