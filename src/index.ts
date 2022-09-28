import express, { Express, Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";
import { HttpError } from "http-errors";
import { conf } from "./config";
import { notesRouter } from "./routes/notes-routes";

const app: Express = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/notes", notesRouter);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  res.status(statusCode).send(err.message);
});

const port = conf.port;

app.listen(port, () => console.log(`Running on port ${port}`));
