export interface IUser {
  _id: string;
  name: string;
  password: string;
  mobile: string;
  mobile2?: string;
  address?: string;
  image: IImage;
  role: string;
  email: string;
}
export interface IUserUpdateBody {
  newPassword?: string;
  name: string;
  mobile2?: string;
  address?: string;
}
