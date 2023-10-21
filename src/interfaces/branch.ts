import { mongoObjectId } from "../types/mongoose";
import { Document } from "mongoose";

import { Images } from "../types/image";

interface ILocation {
  lat: number;
  long: number;
}

export interface IBranch extends Document {
  name: string;
  branchCode: string;
  user?: mongoObjectId;
  nikName?: string;
  adminMobile?: string;
  expirationDate: string;
  registerDate: string;
  main: boolean;
  location: ILocation;
  tags: Array<string>;
  city: string;
  mobile: string;
  mobile2?: string;
  address?: string;
  description?: string;
  status: string;
  categories: Array<mongoObjectId>;
  images: Array<Images>;
  paths: Array<string>;
}
