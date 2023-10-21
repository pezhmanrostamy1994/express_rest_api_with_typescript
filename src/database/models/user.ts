import mongoose, { Document, Model, model, Schema } from "mongoose";
import { ROLES } from "../../utils/const";
import { IUser } from "../../interfaces/user";
import mongoosePaginateV2 from "mongoose-paginate-v2";
const rolesArr = Object.values(ROLES).map((role) => role.value);
export interface IUserModelSchema extends IUser, Document {}

// ISSUE: Own every parameter and any missing dependencies
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      select: false,
    },
    mobile: {
      type: String,
      required: true,
    },
    mobile2: {
      type: String,
    },
    address: {
      type: String,
    },
    image: {
      type: {
        tumb: { type: String },
        medium: { type: String },
        large: { type: String },
      },
      default: {},
    },
    role: {
      type: String,
      enum: Object.values(rolesArr),
      default: "customer",
    },
    email: {
      type: Schema.Types.String,
      lowercase: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
  },
  { timestamps: true }
);
userSchema.virtual("branchs", {
  ref: "Branch",
  localField: "mobile",
  foreignField: "userMobile",
});
mongoose.plugin(mongoosePaginateV2);

export interface UserModel extends Model<IUserModelSchema> {
  paginate: (query?: any, options?: any, callback?: any) => Promise<any>;
}

export const UserModel = model<IUserModelSchema, UserModel>("User", userSchema);
