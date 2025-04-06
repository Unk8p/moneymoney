import { useEffect, useState } from "react";

export default function Frontend() {
  const [signals, setSignals] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then(setSignals)
      .catch((err) => console.error("Failed to load data.json", err));
  }, []);

  const filtered = signals.filter((s) =>
    [s.asset, s.logic, ...s.terms]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Moneytaur Live Signals</h1>
      <input
        style={{ margin: "1em 0", padding: "0.5em" }}
        placeholder="Search asset, term, or logic..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filtered.map((s, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <div>{s.date}</div>
          <img src={s.chart} alt={s.asset} style={{ width: "100%" }} />
          <div><strong>Tags:</strong> {s.terms.join(", ")}</div>
          <div><em>{s.logic}</em></div>
        </div>
      ))}
    </div>
  );
}
