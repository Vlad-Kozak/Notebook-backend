import mongoose from "mongoose";
import { IFullNote } from "../helpers/interfaces";
const Schema = mongoose.Schema;

const notesSchema = new Schema<IFullNote>(
  {
    name: {
      type: String,
      required: [true, "Set name for note"],
      unique: true,
    },
    categoryId: {
      type: String,
      required: [true, "Set category for note"],
    },
    content: {
      type: String,
      required: [true, "Set content for note"],
    },
    archived: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

export const NotesModel = mongoose.model("note", notesSchema);
