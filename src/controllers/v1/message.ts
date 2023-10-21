import { Request, Response } from "express";
import MessageService from "../../services/v1/message/message";
import { responseJson } from "../helperController";
class MessageController {
  public async getAll(req: Request, res: Response): Promise<void> {
    const user: any = req.user._id;
    const data = await MessageService.getAll(user);
    responseJson(res, data);
  }
  public async getAllUnSeen(req: Request, res: Response): Promise<void> {
    const user: any = req.user._id;
    const data = await MessageService.getAllUnSeen(user);
    responseJson(res, data);
  }
  public async seenMessages(req: Request, res: Response): Promise<void> {
    const query: any = req.body;
    await MessageService.seenMessages(query);
    responseJson(res, { message: "عملیات با موفقیت انجام شد" }, 200);
  }
}
export default new MessageController();
