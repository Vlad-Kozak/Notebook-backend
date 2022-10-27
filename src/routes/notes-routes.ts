import { Router } from "express";
import { editedNoteSchema, noteSchema } from "../schemas/notes-schemas";
import { validate } from "../helpers/middlewares/validate";
import { catchAsync } from "../helpers/middlewares/catch-async";
import { notesService } from "../services/notes-service";
import { authorize } from "../helpers/middlewares/authorize";
import {
  serializeNote,
  serializeNotes,
} from "../serializers/notes-serializers";

export const notesRouter = Router();

notesRouter.get(
  "/stats",
  authorize,
  catchAsync(async (req, res, next) => {
    const stats = await notesService.getStats(req.body.userId);
    res.status(200).send(stats);
  })
);

notesRouter.get(
  "/",
  authorize,
  catchAsync(async (req, res, next) => {
    const notes = await notesService.getAllNotes(req.body.userId);
    res.status(200).send(serializeNotes(notes));
  })
);

notesRouter.get(
  "/:id",
  authorize,
  catchAsync(async (req, res, next) => {
    const note = await notesService.getOneNote(req.body.userId, req.params.id);
    res.status(200).send(serializeNote(note));
  })
);

notesRouter.post(
  "/",
  authorize,
  validate(noteSchema),
  catchAsync(async (req, res, next) => {
    const note = await notesService.createNote(req.body.userId, req.body);
    res.status(200).send(serializeNote(note));
  })
);

notesRouter.patch(
  "/:id",
  authorize,
  validate(editedNoteSchema),
  catchAsync(async (req, res, next) => {
    const note = await notesService.editNote(
      req.body.userId,
      req.params.id,
      req.body
    );
    res.status(200).send(serializeNote(note));
  })
);

notesRouter.delete(
  "/:id",
  authorize,
  catchAsync(async (req, res, next) => {
    const note = await notesService.removeNote(req.body.userId, req.params.id);
    res.status(200).send(serializeNote(note));
  })
);
