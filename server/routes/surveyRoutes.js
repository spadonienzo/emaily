import requireLogin from "../middlewares/requireLogin";
import requireCredits from "../middlewares/requireCredits";
import mongoose from "mongoose";

const Survey = mongoose.model("surveys");

export default (app) => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    try {
      const { title, subject, body, recipients } = req.body;
      const survey = new Survey({
        title: title,
        subject: subject,
        body: body,
        recipients: recipients.split(",").map((email) => {
          email.trim();
        }),
        _user: req.user.id,
        dateSent: Date.now(),
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
};
