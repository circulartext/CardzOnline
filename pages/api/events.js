export default async function handler(req, res) {
  const { state } = req.query;

  const keywords = [
    "sports card show",
    "pokemon cards",
    "trading card game",
    "tcg tournament"
  ];

  const token = process.env.EVENTBRITE_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "Missing Eventbrite token" });
  }

  let results = [];

  try {
    for (const keyword of keywords) {
      const response = await fetch(
        `https://www.eventbriteapi.com/v3/events/search/?q=${encodeURIComponent(
          keyword
        )}&location.address=${state}&expand=venue`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (data.events) {
        results.push(...data.events);
      }
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
}
