import express from "express";
import { multerUpload, asyncHandler } from "../../middlewares";
import Controller from "../../controllers/v1/upload";
const router = express.Router();

router.post(
  "/",
  multerUpload.single("file"),
  asyncHandler(Controller.uploadFile)
);
export default router;
