export const validate = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next(); // allow request to continue
  }

  return res.status(401).json({ message: "Unauthorized" });
};
