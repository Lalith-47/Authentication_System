import "dotenv/config";
import express from "express";
import chalk from "chalk";
import session from "express-session";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { validate } from "./middleware/auth.middleware.js";
const app = express();
app.use(express.json());
await connectDB();

app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
  })
);
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/protected", validate, (req, res) => {
  res.status(200).json({ message: "Accessing protected" });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    chalk.greenBright("Server running on port"),
    chalk.blueBright(PORT)
  );
});
