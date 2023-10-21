import { Images } from "../types/image";

export interface IProduct {
  name: string;
  price?: number;
  inventory?: number;
  productCode: string;
  categories?: string;
  paths?: Array<string>;
  images?: Images;
  status: string;
  branchCode?: string;
  views: number;
}
