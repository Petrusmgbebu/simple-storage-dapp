import { useState } from "react";

export default function Healthcare({ attestations, onAttest }) {
  const [kind, setKind] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (kind.trim()) {
      onAttest(kind.trim());
      setKind("");
    }
  }

  return (
    <div className="card">
      <h2>🏥 Healthcare</h2>
      <p className="hint">
        In production, only verified clinics issue attestations.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          placeholder="Kind (e.g. checkup, vaccination)"
        />
        <button type="submit">Add Attestation</button>
      </form>
      <ul>
        {attestations.map((a, i) => (
          <li key={i}>
            <strong>{a.kind}</strong>
            {" — "}
            by {a.issuer.slice(0, 6)}… on{" "}
            {new Date(Number(a.issuedAt) * 1000).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
