import MessageRepo from "../../../repo/message";
import { IMessage, IBodyForSeenMessages } from "../../../interfaces/message";
import { mongoObjectId } from "../../../types/mongoose";

class MessageService {
  private messageRepo;
  constructor() {
    this.messageRepo = MessageRepo;
  }
  public async getAll(
    user: mongoObjectId
  ): Promise<IServiceResult<IMessage[]>> {
    const queryDb: any = { to: user };

    const data: IRepoResult<IMessage[]> = await this.messageRepo.findPaginate(
      queryDb
    );
    return data;
  }
  public async getAllUnSeen(
    user: mongoObjectId
  ): Promise<IServiceResult<IMessage[]>> {
    const data: IRepoResult<IMessage[]> = await this.messageRepo.find({
      seen: false,
      to: user,
    });
    return data;
  }
  public async create(body: IMessage): Promise<IServiceResult<IMessage>> {
    const newData: IRepoResult<IMessage> = await this.messageRepo.createOne(
      body
    );
    return newData;
  }
  public async seenMessages(
    body: IBodyForSeenMessages
  ): Promise<IServiceResult<IMessage>> {
    const newData: IRepoResult<IMessage> = await this.messageRepo.updateMany(
      { _id: { $in: body.ids } },
      {
        seen: true,
      }
    );
    return newData;
  }
}

export default new MessageService();
