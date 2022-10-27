import { Router } from "express";
import { categorySchema } from "../schemas/categories-schemas";
import { validate } from "../helpers/middlewares/validate";
import { catchAsync } from "../helpers/middlewares/catch-async";
import { categoriesService } from "../services/categories-service";

export const categoriesRouter = Router();

categoriesRouter.get(
  "/",
  catchAsync(async (req, res, next) => {
    const categories = await categoriesService.getAllCategories();
    res.status(200).send(categories);
  })
);

categoriesRouter.post(
  "/",
  validate(categorySchema),
  catchAsync(async (req, res, next) => {
    const category = await categoriesService.createCategory(req.body);
    res.status(200).send(category);
  })
);

categoriesRouter.delete(
  "/:id",
  catchAsync(async (req, res, next) => {
    const category = await categoriesService.removeCategory(req.params.id);
    res.status(200).send(category);
  })
);
