import express, { Express, Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { HttpError } from "http-errors";
import { conf } from "./config";
import { authRouter } from "./routes/auth-routes";
import { notesRouter } from "./routes/notes-routes";

const app: Express = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  res.status(statusCode).send(err.message);
});

const port = conf.port;
const uriDb = conf.dbUrl;

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, function () {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
