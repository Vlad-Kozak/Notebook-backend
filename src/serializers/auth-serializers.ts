import { IUser } from "../helpers/interfaces";
import { serializeUser } from "./users-serializers";

export const serializeLogin = (user: IUser, token: string) => {
  return { user: serializeUser(user), token };
};
