import { Router } from "express";
import { editedNoteSchema, noteSchema } from "../schemas/notes-schemas";
import { validate } from "../helpers/middlewares/validate";
import { catchAsync } from "../helpers/middlewares/catch-async";
import { notesService } from "../services/notes-service";

export const notesRouter = Router();

notesRouter.post(
  "/",
  validate(noteSchema),
  catchAsync(async (req, res, next) => {
    const note = await notesService.createNote(req.body);
    res.status(200).send(note);
  })
);

notesRouter.delete(
  "/:id",
  catchAsync(async (req, res, next) => {
    const note = await notesService.removeNote(req.params.id);
    res.status(200).send(note);
  })
);

notesRouter.patch(
  "/:id",
  validate(editedNoteSchema),
  catchAsync(async (req, res, next) => {
    const note = await notesService.editNote(req.params.id, req.body);
    res.status(200).send(note);
  })
);

notesRouter.get(
  "/stats",
  catchAsync(async (req, res, next) => {
    const stats = await notesService.getStats();
    res.status(200).send(stats);
  })
);

notesRouter.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    const note = await notesService.getOneNote(req.params.id);
    res.status(200).send(note);
  })
);

notesRouter.get(
  "/",
  catchAsync(async (req, res, next) => {
    const response = await notesService.getAllNotes();
    res.status(200).send(response);
  })
);
