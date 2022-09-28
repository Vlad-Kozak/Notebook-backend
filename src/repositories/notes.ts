import fs from "fs/promises";
import path from "path";
import { IFullNote } from "../helpers/interfaces";

const notesPath = path.resolve("./src/repositories/notes.json");

export async function readNotes() {
  return JSON.parse(await fs.readFile(notesPath, "utf8"));
}

export function writeNotes(notes: IFullNote[]) {
  return fs.writeFile(notesPath, JSON.stringify(notes), "utf8");
}
