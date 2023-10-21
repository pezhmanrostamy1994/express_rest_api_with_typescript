import mongoose, { model, Model, Document } from "mongoose";
import mongoosePaginateV2 from "mongoose-paginate-v2";
import { IMessageModel } from "../../interfaces/message";
import { Types } from "mongoose";
export default interface IMessageModelSchema extends IMessageModel, Document {}

const messageSchema = new mongoose.Schema(
  {
    from: { type: Types.ObjectId, ref: "User" }, // اگر سیستم این پیام را ارسال کند مقدار دهی نمیشود
    to: { type: Types.ObjectId, required: false }, // اگر پیام عمومی باشد این بخش مقدار دهی نمیشود
    seen: { type: Boolean, default: false },
    message: { type: String, required: true },
    replyMessage: { type: String},
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(mongoosePaginateV2);

messageSchema.plugin(mongoosePaginateV2);

export interface MessageModel extends Model<IMessageModelSchema> {
  paginate: (query?: any, options?: any, callback?: any) => Promise<any>;
}

export const MessageModel = model<IMessageModelSchema, MessageModel>(
  "Message",
  messageSchema
);
