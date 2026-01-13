import mongoose from "mongoose";
import chalk from "chalk";
export const connectDB = async () => {
  try {
    const status = await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.green("MongoDB Connected ✅"));
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
