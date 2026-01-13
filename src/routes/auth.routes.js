import passport from "passport";
import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    req.session.userId = req.user._id;
    res.json({ Message: "Successfully logged in ✅" });
  }
);
router.get("/me", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ userId: req.session.userId });
});

export default router;
