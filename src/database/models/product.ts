import mongoose, { model, Model, Document } from "mongoose";
import mongoosePaginateV2 from "mongoose-paginate-v2";
import { STATUS } from "../../utils/const";
import { IProduct } from "../../interfaces/product";
import { imageSchema } from "./baseSchema";

const statusEnum = Object.values(STATUS).map((item) => item.value);

export default interface IProductModelSchema extends IProduct, Document {}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number },
    inventory: { type: Number }, // موجودی فروشگاه
    productCode: { type: String, required: true },
    categories: [{ type: mongoose.Types.ObjectId, required: true }],
    paths: [{ type: String, required: true }],
    images: [imageSchema],
    status: { type: String, enum: statusEnum, required: true },
    branchCode: { type: String, required: true },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
productSchema.index({ name: "text", tags: "text" }); // ایجاد ایندکس برای فیلدهای name و tags برای استفاده در جستجوی متنی
productSchema.index({ views: -1 }); // ایجاد ایندکس برای فیلد views برای مرتب سازی بر اساس تعداد بازدیدها
productSchema.index({ createdAt: -1 }); // ایجاد ایندکس برای فیلد createdAt برای مرتب سازی بر اساس تاریخ ایجاد (جدیدترین محصولات)
productSchema.pre("validate", function () {
  const thisProduct: any = this;
  thisProduct.productCode = new Date().getTime();
});
mongoose.plugin(mongoosePaginateV2);
export interface ProductModel extends Model<IProductModelSchema> {
  paginate: (query?: any, options?: any, callback?: any) => Promise<any>;
}

export const ProductModel = model<IProductModelSchema, ProductModel>(
  "Product",
  productSchema
);
