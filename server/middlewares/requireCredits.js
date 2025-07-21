const requireCredits = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(401).send({ error: "You must add credits in!" });
  }

  next();
};

export default requireCredits;
