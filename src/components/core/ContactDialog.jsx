import { useEffect, useRef, useState } from "react";
import { submitContactForm } from "../../utils/submitForm.js";
import { FormSuccess } from "./FormSuccess.jsx";

export function ContactDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  const [status, setStatus] = useState("idle");

  const close = () => {
    setStatus("idle");
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => dialogRef.current?.querySelector("input")?.focus());
    const escape = event => {
      if (event.key === "Escape") {
        setStatus("idle");
        onClose();
      }
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", escape);
    };
  }, [open, onClose]);

  const submit = async event => {
    event.preventDefault();
    setStatus("sending");
    const data = new FormData(event.currentTarget);
    try {
      await submitContactForm("CUELUM website enquiry", {
        Name: data.get("name"),
        Email: data.get("email"),
        Subject: data.get("subject"),
        Message: data.get("message"),
      });
      event.currentTarget.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;
  return (
    <div className="contact-dialog-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && close()}>
      <section ref={dialogRef} className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-dialog-title">
        <button className="contact-dialog-close" type="button" onClick={close} aria-label="Close contact form">×</button>
        {status === "sent" ? (
          <FormSuccess className="contact-dialog-success" titleId="contact-dialog-title" />
        ) : (
          <>
            <span className="contact-dialog-kicker">Book a call with us</span>
            <h2 id="contact-dialog-title">Tell us what you’re<br />curious about</h2>
            <form onSubmit={submit}>
              <input name="name" placeholder="Your name" autoComplete="name" required />
              <input name="email" type="email" placeholder="Email" autoComplete="email" required />
              <input name="subject" placeholder="What would you like to discuss?" required />
              <textarea name="message" placeholder="Your message" rows="4" required />
              <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send"}</button>
              <p className="contact-dialog-status" role="status">
                {status === "error" && "The form could not send. Please email hello@cuelum.com."}
              </p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
