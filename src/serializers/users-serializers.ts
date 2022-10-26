import { IUser } from "../helpers/interfaces";

export const serializeUser = (user: IUser) => {
  return {
    id: user._id.toString(),
    email: user.email,
  };
};

export const serializeUserResponse = (user: IUser) => {
  return { user: serializeUser(user) };
};
