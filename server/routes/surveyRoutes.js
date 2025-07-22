import mongoose from "mongoose";
import requireLogin from "../middlewares/requireLogin.js";
import requireCredits from "../middlewares/requireCredits.js";
import Mailer from "../services/Mailer.js";
import surveyTemplate from "../services/emailTemplates/surveyTemplate.js";

const Survey = mongoose.model("surveys");

export default function surveyRoutes(app) {
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    try {
      const { title, subject, body, recipients } = req.body;

      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients
          .split(",")
          .map((email) => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now(),
      });

      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
}
