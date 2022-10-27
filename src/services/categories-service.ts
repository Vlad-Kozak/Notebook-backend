import { NotFound, Conflict } from "http-errors";
import { ICategory } from "../helpers/interfaces";
import { CategoriesModel } from "../models/categories-model";

const getAllCategories = async () => {
  const categories = await CategoriesModel.find();

  if (!categories) {
    throw new NotFound("Data not found");
  }

  return categories;
};

const createCategory = async ({ name, photoURL }: ICategory) => {
  const copy = await CategoriesModel.findOne({ name });

  if (copy) {
    throw new Conflict("Note with such name already exists");
  }

  return CategoriesModel.create({ name, photoURL });
};

const removeCategory = async (_id: string) => {
  const category = await CategoriesModel.findOneAndRemove({ _id });

  if (!category) {
    throw new NotFound("Note with this id not found");
  }

  return category;
};

export const categoriesService = {
  getAllCategories,
  createCategory,
  removeCategory,
};
