import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    gender: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
