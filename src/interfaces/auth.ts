import { mongoObjectId } from "../types/mongoose";

export interface IUserLogin {
  password: string;
  emailOrMobile: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}
export interface IGenerateUserToken {
  email: string;
  mobile: string;
  name: string;
  _id: string;
}
export interface IIsAuthurize {
  isAthorize: boolean;
  user: IReqUser;
}
export interface IReqUser {
  role: string;
  mobile: string;
  name: string;
  _id: mongoObjectId;
}
