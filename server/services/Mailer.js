import sendgrid from "@sendgrid/mail";
import keys from "../config/keys.js";

sendgrid.setApiKey(keys.sendGridKey);

class Mailer extends sendgrid.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.setFrom("no-reply@yourdomain.com");
    this.setSubject(subject);
    this.addContent("text/html", content);
    this.addRecipients(recipients);
  }

  addRecipients(recipients) {
    recipients.forEach(({ email }) => {
      this.addTo(email);
    });
  }

  async send() {
    try {
      await sendgrid.send(this);
    } catch (err) {
      console.error("SendGrid Error:", err);
      throw err;
    }
  }
}

export default Mailer;
