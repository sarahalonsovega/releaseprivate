import { useState } from "react";
import { TextField } from "./core/TextField.jsx";
import { Button } from "./core/Button.jsx";

const body = { margin: 0, color: "var(--text-secondary)", lineHeight: "var(--body-line-height)" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NotifyForm({ label, button, success, placeholder }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  if (sent) return <p style={{ ...body, color: "var(--magenta)" }}>{success}</p>;

  const submit = () => {
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setSent(true);
  };

  return (
    <div style={{ display: "flex", gap: "var(--space-5)", alignItems: "flex-end", maxWidth: "520px", margin: "0 auto" }}>
      <TextField label={label} placeholder={placeholder} value={email} onChange={e => setEmail(e.target.value)} error={error} required style={{ flex: 1 }} />
      <Button arrow onClick={submit}>{button}</Button>
    </div>
  );
}
