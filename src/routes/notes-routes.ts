import { Router } from "express";
import { validate } from "../helpers/middlewares/validate";
import { notesService } from "../services/notes-service";

export const notesRouter = Router();

notesRouter.post("/", (req, res, next) => {
  notesService.createNote();
  res.status(200).send();
});

notesRouter.delete("/:id", (req, res, next) => {
  notesService.removeNote();
  res.status(200).send();
});

notesRouter.patch("/:id", (req, res, next) => {
  notesService.editNote();
  res.status(200).send();
});

notesRouter.get("/:id", (req, res, next) => {
  notesService.getOneNote();
  res.status(200).send();
});

notesRouter.get("/", (req, res, next) => {
  notesService.getAllNotes();
  res.status(200).send();
});

notesRouter.get("/stats", (req, res, next) => {
  notesService.getStats();
  res.status(200).send();
});
