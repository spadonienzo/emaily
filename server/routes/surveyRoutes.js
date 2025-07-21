import mongoose from "mongoose";
import requireLogin from "../middlewares/requireLogin.js";
import requireCredits from "../middlewares/requireCredits.js";
import Mailer from "../"; // Make sure this import path is correct!

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

      // You might want to save the survey and send mail here, e.g.:
      // await survey.save();
      // const mailer = new Mailer(survey, surveyTemplate(survey));
      // await mailer.send();

      res.status(201).json(survey);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
}
