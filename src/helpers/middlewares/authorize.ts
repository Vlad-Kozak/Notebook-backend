import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { conf } from "../../config";
import { UserModel } from "../../models/users-model";

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  let payload: any;

  try {
    payload = jwt.verify(token, conf.secret);
  } catch (error) {
    return res.status(401).send("Not authorized");
  }

  const user = await UserModel.findById(payload.sub);

  if (!user || user.token !== token) {
    return res.status(401).send("Not authorized");
  }

  req.body.userId = payload.sub;
  next();
};
