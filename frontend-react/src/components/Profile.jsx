export default function Profile({
  profile,
  eduPoints,
  healthPoints,
  creditScore,
}) {
  return (
    <div className="card">
      <h2>Hello, {profile?.name || "—"}</h2>
      <div className="stat">
        <div className="stat-label">Education points</div>
        <div className="stat-value">{eduPoints}</div>
      </div>
      <div className="stat">
        <div className="stat-label">Health points</div>
        <div className="stat-value">{healthPoints}</div>
      </div>
      <div className="stat">
        <div className="stat-label">Credit score</div>
        <div className="stat-value">{creditScore}</div>
      </div>
    </div>
  );
}
