import mongoose, { model, Model, Document } from "mongoose";
import mongoosePaginateV2 from "mongoose-paginate-v2";
import { STATUS } from "../../utils/const";
import { IPost } from "../../interfaces/post";
import { imageSchema, optionalInputSchema } from "./baseSchema";

const statusEnum = Object.values(STATUS).map((item) => item.value);

export default interface IPostModelSchema extends IPost, Document {}

const postSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    price: { type: Number },
    categories: [{ type: mongoose.Types.ObjectId, required: true }],
    paths: [{ type: String, required: true }],
    // images: [imageSchema],
    images: [imageSchema],
    status: { type: String, enum: statusEnum, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    description: { type: String, required: true },
    show: { type: Boolean, default: true },
    optionalInputs: [optionalInputSchema],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
postSchema.index({ name: "text", tags: "text" }); // ایجاد ایندکس برای فیلدهای name و tags برای استفاده در جستجوی متنی
postSchema.index({ views: -1 }); // ایجاد ایندکس برای فیلد views برای مرتب سازی بر اساس تعداد بازدیدها
postSchema.index({ createdAt: -1 }); // ایجاد ایندکس برای فیلد createdAt برای مرتب سازی بر اساس تاریخ ایجاد (جدیدترین محصولات)
postSchema.pre("validate", function () {
  const thisProduct: any = this;
  thisProduct.productCode = new Date().getTime();
});
mongoose.plugin(mongoosePaginateV2);
export interface PostModel extends Model<IPostModelSchema> {
  paginate: (query?: any, options?: any, callback?: any) => Promise<any>;
}

export const PostModel = model<IPostModelSchema, PostModel>("Post", postSchema);
