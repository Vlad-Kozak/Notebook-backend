import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Conflict, Unauthorized, NotFound, BadRequest } from "http-errors";
import { UserModel } from "../models/users-model";
import { conf } from "../config";
import { IUpdateUserDto, IUser, IUserDto } from "../helpers/interfaces";

const register = async (dto: IUserDto) => {
  const { email, password } = dto;
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Conflict("Email in use");
  }

  const user = UserModel.create({
    email,
    password: await hashPassword(password),
  });

  return user;
};

const login = async (dto: IUserDto) => {
  const { email, password } = dto;
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Unauthorized("User with this email does not exist");
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new Unauthorized("Password is wrong");
  }

  const token = generateToken(user);

  await UserModel.findByIdAndUpdate({ _id: user._id }, { token });
  return { user, token };
};

const getCurrentUser = async (userId: string) => {
  const user = await UserModel.findById(userId);
  return user;
};

const logout = async (userId: string) => {
  await UserModel.findByIdAndUpdate({ _id: userId }, { token: null });
};

const updateUser = async (userId: string, fields: IUpdateUserDto) => {
  const user = await UserModel.findByIdAndUpdate({ _id: userId }, fields, {
    new: true,
  });

  return user;
};

const hashPassword = (password: string) => {
  return bcrypt.hash(password, conf.saltRounds);
};

const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

const generateToken = (user: IUser) => {
  return jwt.sign({ sub: user._id.toString() }, conf.secret, {
    expiresIn: "2w",
  });
};

export const authService = {
  register,
  login,
  getCurrentUser,
  logout,
  updateUser,
};
