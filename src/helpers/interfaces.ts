import { ObjectId } from "mongoose";

export interface IFullNote {
  _id: ObjectId;
  name: string;
  categoryId: string;
  content: string;
  archived: boolean;
  owner: ObjectId;
  createdAt: number;
  updatedAt: number;
}

export interface INote {
  name: string;
  categoryId: string;
  content: string;
}

export interface IStats {
  task?: ICategoryStats;
  idea?: ICategoryStats;
  randomThought?: ICategoryStats;
}

interface ICategoryStats {
  activeCount: number;
  archivedCount: number;
}

export interface IUser {
  _id: ObjectId;
  email: string;
  password: string;
  token: null | string;
  createdAt: number;
  updatedAt: number;
}

export interface IUserDto {
  email: string;
  password: string;
}

export interface IUpdateUserDto {
  email?: string;
  password?: string;
}
