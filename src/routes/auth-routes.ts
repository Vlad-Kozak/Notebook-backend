import { Router } from "express";
import { validate } from "../helpers/middlewares/validate";
import { catchAsync } from "../helpers/middlewares/catch-async";
import { authorize } from "../helpers/middlewares/authorize";
import { serializeUserResponse } from "../serializers/users-serializers";
import { serializeLogin } from "../serializers/auth-serializers";
import { registerSchema, loginSchema } from "../schemas/users-schemas";
import { authService } from "../services/auth-service";

export const authRouter = Router();

authRouter.post(
  "/register",
  validate(registerSchema),
  catchAsync(async (req, res, next) => {
    const user = await authService.register(req.body);
    res.status(201).send(serializeUserResponse(user));
  })
);

authRouter.post(
  "/login",
  validate(loginSchema),
  catchAsync(async (req, res, next) => {
    const response = await authService.login(req.body);
    const { user, token } = response;
    res.status(201).send(serializeLogin(user, token));
  })
);

authRouter.post(
  "/google",
  catchAsync(async (req, res, next) => {
    const response = await authService.google(req.body);
    const { user, token } = response;
    res.status(201).send(serializeLogin(user, token));
  })
);

authRouter.get(
  "/current",
  authorize,
  catchAsync(async (req, res, next) => {
    const user = await authService.getCurrentUser(req.body.userId);
    res.status(200).send(serializeUserResponse(user));
  })
);

authRouter.get(
  "/logout",
  authorize,
  catchAsync(async (req, res, next) => {
    await authService.logout(req.body.userId);
    res.status(200).send("Success");
  })
);
