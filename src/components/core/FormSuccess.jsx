import { useEffect, useRef } from "react";

export function FormSuccess({ className = "", titleId }) {
  const successRef = useRef(null);

  useEffect(() => {
    successRef.current?.focus();
  }, []);

  return (
    <div
      ref={successRef}
      className={`form-success-screen ${className}`.trim()}
      role="status"
      aria-live="polite"
      tabIndex="-1"
    >
      <strong id={titleId} className="form-success-title">Sent!</strong>
      <p>We will get in contact shortly</p>
    </div>
  );
}
