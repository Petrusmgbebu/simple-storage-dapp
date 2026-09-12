import { useState } from "react";

export default function Finance({
  loanLimit,
  borrowed,
  available,
  onRequest,
  onRepay,
}) {
  const [amount, setAmount] = useState("0.001");

  function handleRequest(e) {
    e.preventDefault();
    if (Number(amount) > 0) onRequest(amount);
  }

  return (
    <div className="card">
      <h2>💰 Finance</h2>
      <div className="stat">
        <div className="stat-label">Loan limit</div>
        <div className="stat-value">{Number(loanLimit).toFixed(4)}</div>
      </div>
      <div className="stat">
        <div className="stat-label">Borrowed</div>
        <div className="stat-value">{Number(borrowed).toFixed(4)}</div>
      </div>
      <div className="stat">
        <div className="stat-label">Available</div>
        <div className="stat-value">{Number(available).toFixed(4)}</div>
      </div>
      <form onSubmit={handleRequest} style={{ marginTop: 16 }}>
        <input
          type="number"
          step="0.0001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in ETH"
          style={{ width: 220 }}
        />
        <button type="submit">Request Loan</button>
        <button
          type="button"
          className="secondary"
          onClick={() => onRepay(amount)}
        >
          Repay
        </button>
      </form>
    </div>
  );
}
