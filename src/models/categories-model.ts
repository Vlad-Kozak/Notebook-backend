import mongoose from "mongoose";
import { ICategory } from "../helpers/interfaces";
const Schema = mongoose.Schema;

const categoriesSchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Set name for category"],
      unique: true,
    },
    photoURL: {
      type: String,
      required: [true, "Set photo path for category"],
      unique: true,
    },
  },
  { versionKey: false }
);

export const CategoriesModel = mongoose.model("category", categoriesSchema);
