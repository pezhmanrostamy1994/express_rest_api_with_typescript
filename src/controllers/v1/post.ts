import { Request, Response } from "express";
import PostService from "../../services/v1/post/post";
import { responseJson } from "../helperController";

class PostController {
  async search(req: Request, res: Response): Promise<void> {
    const result = await PostService.search(req.query);
    responseJson(res, result);
  }
  async getAll(req: Request, res: Response): Promise<void> {
    const result = await PostService.getAll(req.query);
    responseJson(res, result);
  }
  async getAllSimilarity(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const result = await PostService.getAllSimilarity(id);
    responseJson(res, result);
  }
  async getMine(req: Request, res: Response): Promise<void> {
    const query = req.query;
    const user = req.user;
    const result = await PostService.getMain({ ...query, user });
    responseJson(res, result);
  }
  async getOneById(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const result = await PostService.getById(id);
    responseJson(res, result);
  }
  async getAllWithoutPaginate(req: Request, res: Response): Promise<void> {
    const result = await PostService.getAllWithoutPaginate(req.query);
    responseJson(res, result);
  }
  async create(req: Request, res: Response): Promise<void> {
    const reqUser: any = req.user;
    const result = await PostService.createOne(req.body, reqUser);
    responseJson(res, result);
  }
  async update(req: Request, res: Response): Promise<void> {
    const reqUser: any = req.user;
    const id: string = req.params.id;
    const userRole: string = reqUser?.role;
    const result = await PostService.updateOne(id, req.body, userRole);
    result.message = "پست شما بعد از تایید مدیر در سایت نمایش داده خواهد شد";
    responseJson(res, result);
  }
  async updateStatus(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const result = await PostService.updatePostStatus(id, req.body);
    responseJson(res, result);
  }
  async updateImages(req: Request, res: Response) {
    return res.send({ message: "این ای پی ای پیاده سازی نشده است" });
  }
}

export default new PostController();
