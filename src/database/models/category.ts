import mongoose, { model, Model, Document } from "mongoose";
import mongoosePaginateV2 from "mongoose-paginate-v2";
import { CATEGORY_TYPE, STATUS } from "../../utils/const";
import { ICategoryModel } from "../../interfaces/catgeory";
import { optionalInputSchema } from "./baseSchema";
const typeEnum = Object.values(CATEGORY_TYPE).map((t) => t.value);
export default interface ICategoryModelSchema
  extends ICategoryModel,
    Document {}

const categroySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max: 200,
    },
    categoryType: { type: String, enum: typeEnum },
    parents: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
    optionalInputs: [optionalInputSchema],
    status: {
      type: String,
      enum: Object.values(STATUS).map((item) => item.value),
      default: "active",
    },
    paths: [String],
    code: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

mongoose.plugin(mongoosePaginateV2);
categroySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parents",
});

categroySchema.plugin(mongoosePaginateV2);

export interface CategroyModel extends Model<ICategoryModelSchema> {
  paginate: (query?: any, options?: any, callback?: any) => Promise<any>;
}

export const CategroyModel = model<ICategoryModelSchema, CategroyModel>(
  "Category",
  categroySchema
);
