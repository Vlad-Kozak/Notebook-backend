import mongoose from "mongoose";
import { IUser } from "../helpers/interfaces";
const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);
