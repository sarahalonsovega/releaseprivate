const ENDPOINT = "https://formsubmit.co/ajax/hello@cuelum.com";

export async function submitContactForm(subject, fields) {
  const payload = new FormData();
  payload.append("_subject", subject);
  payload.append("_template", "table");
  payload.append("_captcha", "false");
  Object.entries(fields).forEach(([label, value]) => {
    if (String(value ?? "").trim()) payload.append(label, String(value).trim());
  });

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: payload,
  });
  if (!response.ok) throw new Error("Unable to send form");
  return response.json();
}
