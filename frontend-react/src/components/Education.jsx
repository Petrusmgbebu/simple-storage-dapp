import { useState } from "react";

export default function Education({ certificates, onIssue }) {
  const [course, setCourse] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (course.trim()) {
      onIssue(course.trim());
      setCourse("");
    }
  }

  return (
    <div className="card">
      <h2>📚 Education</h2>
      <p className="hint">
        In production, only verified teachers issue certificates.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Course name (e.g. Blockchain Basics)"
        />
        <button type="submit">Add Certificate</button>
      </form>
      <ul>
        {certificates.map((c, i) => (
          <li key={i}>
            <strong>{c.courseName}</strong>
            {" — "}
            by {c.issuer.slice(0, 6)}… on{" "}
            {new Date(Number(c.issuedAt) * 1000).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
