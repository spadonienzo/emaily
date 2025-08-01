export default function validateEmails(emails = "") {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => email && !regex.test(email)); // evita strings vacíos

  return invalidEmails.length
    ? `Invalid emails: ${invalidEmails.join(", ")}`
    : undefined;
}
