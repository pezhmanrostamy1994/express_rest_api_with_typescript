import { Document, Model, model, Schema } from "mongoose";
import mongoosePaginateV2 from "mongoose-paginate-v2";
import { STATUS } from "../../utils/const";
import { IBranch } from "../../interfaces/branch";
import { imageSchema } from "./baseSchema";

const statusEnum = Object.values(STATUS).map((item) => item.value);

export default interface IBranchModel extends IBranch, Document {}

const branchSchema = new Schema<IBranchModel>(
  {
    name: { type: String, required: true },
    branchCode: { type: String, required: true, unique: true },
    userMobile: { type: String, required: true },
    nikName: { type: String },
    expirationDate: { type: Date },
    registerDate: { type: Date },
    main: { type: Boolean },
    location: { lat: Number, long: Number },
    tags: [],
    city: String,
    mobile: { type: String },
    mobile2: { type: String },
    address: { type: String },
    description: { type: String },
    status: { type: String, enum: statusEnum, default: "active" },
    categories: [{ type: Schema.Types.ObjectId }],
    images: [imageSchema],
    paths: [{ type: String }],
    faceBook: { type: String },
    instagram: { type: String },
    telegram: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
branchSchema.index({ name: "text", tags: "text" }); // ایجاد ایندکس برای فیلدهای name و tags برای استفاده در جستجوی متنی
branchSchema.index({ views: -1 }); // ایجاد ایندکس برای فیلد views برای مرتب سازی بر اساس تعداد بازدیدها
branchSchema.index({ createdAt: -1 }); // ایجاد ایندکس برای فیلد createdAt برای مرتب سازی بر اساس تاریخ ایجاد (جدیدترین محصولات)
branchSchema.pre("validate", function () {
  const thisBranch: any = this;
  thisBranch.branchCode = String(new Date().getTime());
});

branchSchema.plugin(mongoosePaginateV2);

export interface BranchModel extends Model<IBranchModel> {
  paginate: (query?: any, options?: any, callback?: any) => Promise<any>;
}

export const BranchModel = model<IBranchModel, BranchModel>(
  "Branch",
  branchSchema
);
