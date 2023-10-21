import { mongoObjectId } from "../types/mongoose";
import { Images } from "../types/image";

export interface IPost {
  _id: mongoObjectId;
  name: string;
  price?: number;
  categories?: Array<string>;
  paths?: Array<string>;
  images?: Images;
  status: string;
  city: string;
  province: string;
  description: string;
  show: string;
  user: mongoObjectId;
  adminMessage?: string;
}
