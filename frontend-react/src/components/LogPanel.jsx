import { useEffect, useRef } from "react";

export default function LogPanel({ logs }) {
  const ref = useRef(null);

  // Auto-scroll to the bottom whenever logs change
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [logs]);

  return (
    <div className="log" ref={ref}>
      {logs.map((entry, i) => (
        <div key={i}>
          [{entry.time}] {entry.msg}
        </div>
      ))}
    </div>
  );
}
