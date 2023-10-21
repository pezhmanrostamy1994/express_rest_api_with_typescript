import { Request, Response } from "express";
import ProductService from "../../services/v1/product/product";
import { responseJson } from "../helperController";

class ProductController {
  async search(req: Request, res: Response): Promise<void> {
    const result = await ProductService.search(req.query);
    responseJson(res, result);
  }
  async getAll(req: Request, res: Response): Promise<void> {
    const result = await ProductService.getAll(req.query);
    responseJson(res, result);
  }
  async getOneById(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const result = await ProductService.getById(id);
    responseJson(res, result);
  }
  async getAllWithoutPaginate(req: Request, res: Response): Promise<void> {
    const result = await ProductService.getAllWithoutPaginate(req.query);
    responseJson(res, result);
  }
  async create(req: Request, res: Response): Promise<void> {
    const reqUser: any = req.user;
    const userRole: string = reqUser?.role;
    const result = await ProductService.createOne(req.body, userRole);
    responseJson(res, result);
  }
  async update(req: Request, res: Response): Promise<void> {
    const reqUser: any = req.user;
    const id: string = req.params.id;
    const userRole: string = reqUser?.role;
    const result = await ProductService.updateOne(id, req.body, userRole);
    responseJson(res, result);
  }
  async updateStatus(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const result = await ProductService.updateProductStatus(id, req.body);
    responseJson(res, result);
  }
  async updateImages(req: Request, res: Response) {
    return res.send({ message: "این ای پی ای پیاده سازی نشده است" });
    // const reqUser: any = req.user;
    // const userRole: string = reqUser?.role;
    // const user: IReqUser = {
    //   role: userRole,
    //   mobile: reqUser.mobile,
    // };
    // const result = await ProductService.updateImages(req.body, user);
    // responseJson(res, result);
  }
}

export default new ProductController();
