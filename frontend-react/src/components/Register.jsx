import { useState } from "react";

export default function Register({ onRegister, disabled }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim()) onRegister(name.trim());
  }

  return (
    <div className="card">
      <h2>Register</h2>
      <p className="hint">Create your passport on-chain.</p>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button type="submit" disabled={disabled}>
          Register
        </button>
      </form>
    </div>
  );
}
