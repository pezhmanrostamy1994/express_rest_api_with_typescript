import { Request, Response } from "express";
import BranchServices from "../../services/v1/branch/branch";
import { responseJson } from "../helperController";
import { IReqUser } from "../../../src/interfaces/auth";

class ProductController {
  async search(req: Request, res: Response): Promise<void> {
    const result = await BranchServices.search(req.query);
    responseJson(res, result);
  }
  async myBranches(req: Request, res: Response): Promise<void> {
    const result = await BranchServices.myBrnachs(
      req.user as IReqUser,
      req.query
    );
    responseJson(res, result);
  }
  async getAll(req: Request, res: Response): Promise<void> {
    const result = await BranchServices.getAll(req.query);
    responseJson(res, result);
  }
  async getOneById(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const result = await BranchServices.getById(id);
    responseJson(res, result);
  }
  async getAllWithoutPaginate(req: Request, res: Response): Promise<void> {
    const result = await BranchServices.getAllWithoutPaginate(req.query);
    responseJson(res, result);
  }
  async create(req: Request, res: Response): Promise<void> {
    const reqUser: any = req.user;
    const userRole: string = reqUser?.role;
    const result = await BranchServices.createOne(req.body, userRole);
    responseJson(res, result);
  }
  async update(req: Request, res: Response): Promise<void> {
    const reqUser: any = req.user;
    const id: string = req.params.id;
    const userRole: string = reqUser?.role;
    const result = await BranchServices.updateOne(id, req.body, userRole);
    responseJson(res, result);
  }
  async updateStatus(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const result = await BranchServices.updateBranchStatus(id, req.body);
    responseJson(res, result);
  }
  async updateImages(req: Request, res: Response) {
    return res.send({ message: "این ای پی ای پیاده سازی نشده است" });
  }
}

export default new ProductController();
