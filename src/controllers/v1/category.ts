import { Request, Response } from "express";
import CategoryService from "../../services/v1/category/category";
import {
  ICategoryForCreate,
  ICategoryForUpdate,
} from "../../interfaces/catgeory";
import { mongoObjectId } from "../../types/mongoose";
import { stringToMongoObjectId } from "../../utils/helper";
import { responseJson } from "../helperController";
class CategoryController {
  public async getAll(req: Request, res: Response): Promise<void> {
    const query: any = req.query;
    const newDate = await CategoryService.getAll(query);
    responseJson(res, newDate, 201);
  }
  public async getAllWithoutPaginate(
    req: Request,
    res: Response
  ): Promise<void> {
    const query: any = req.query;
    const newDate = await CategoryService.getAllWithoutPaginate(query);
    responseJson(res, newDate, 201);
  }
  public async getById(req: Request, res: Response): Promise<void> {
    const id: any = req.params.id;
    const newDate = await CategoryService.getAllById(id);
    responseJson(res, newDate, 201);
  }
  public async create(req: Request, res: Response): Promise<void> {
    const body: ICategoryForCreate = req.body;
    const newDate = await CategoryService.create(body);
    responseJson(res, newDate, 201);
  }
  public async udpateOne(req: Request, res: Response): Promise<void> {
    const body: ICategoryForUpdate = req.body;
    const id: mongoObjectId | mongoObjectId[] = stringToMongoObjectId(
      req.params.id
    );
    const newDate = await CategoryService.updateOne(body, id as mongoObjectId);
    responseJson(res, newDate, 201);
  }
}
export default new CategoryController();
