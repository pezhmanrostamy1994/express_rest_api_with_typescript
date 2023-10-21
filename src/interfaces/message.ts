import { mongoObjectId } from "../types/mongoose";
export interface IMessageModel {
  from?: mongoObjectId;
  to?: mongoObjectId;
  seen?: boolean;
  message: string;
  replyMessage?: string;
}

export interface IMessage extends IMessageModel {
  pathId?: mongoObjectId;
  baseUrl?: string;
}
export interface IBodyForSeenMessages {
  ids: Array<mongoObjectId>;
}
