import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const schema = new Schema(
  {
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.githubId;
      },
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
schema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
schema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
export default mongoose.model("User", schema);
