import { Request, Response } from "express";
import UploadService from "../../services/v1/upload/upload";
import { responseJson } from "../helperController";

class ProductController {
  async uploadFile(req: Request, res: Response): Promise<void> {
    const result = await UploadService.uploadFile(req.file?.filename);
    responseJson(res, result);
  }
}

export default new ProductController();
