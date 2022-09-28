import { Router } from "express";
import { validate } from "../helpers/middlewares/validate";
export const notesRouter = Router();

notesRouter.get("/", (req, res, next) => {
  res.status(200).send();
});
