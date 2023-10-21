import { Request, Response } from "express";
import userervice from "../../services/v1/user/user";
import { responseJson } from "../helperController";
import { IReqUser } from "../../../src/interfaces/auth";
class CategoryController {
  public async getAll(req: Request, res: Response): Promise<void> {
    const query: any = req.query;
    const data = await userervice.getAll(query);
    responseJson(res, data, 200);
  }
  public async getAllWithoutPaginate(
    req: Request,
    res: Response
  ): Promise<void> {
    const query: any = req.query;
    const data = await userervice.getAllWithoutPaginate(query);
    responseJson(res, data, 200);
  }
  public async getById(req: Request, res: Response): Promise<void> {
    const id: any = req.params.id;
    const data = await userervice.getById(id);
    responseJson(res, data, 200);
  }
  public async getMe(req: Request, res: Response): Promise<void> {
    const data = await userervice.geMe(req.user as IReqUser);
    responseJson(res, data, 200);
  }
  public async getOne(req: Request, res: Response): Promise<void> {
    const query: any = req.query;
    const data = await userervice.getOne(query);
    responseJson(res, data, 200);
  }
  public async updateOne(req: Request, res: Response): Promise<void> {
    const id = req.user._id;
    const data = await userervice.update(id, req.body);
    responseJson(res, data, 200);
  }
}
export default new CategoryController();
