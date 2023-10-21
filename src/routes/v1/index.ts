import express from "express";
import { BASE_UL } from "../../utils/const";
const router = express.Router();

//Require Routes
import authRoutes from "./auth";
import categoryRoutes from "./category";
import branchRoutes from "./branch";
import productRoutes from "./product";
import userRoutes from "./user";
import uploadRoutes from "./upload";
import postRoutes from "./post";
import messagesRoutes from "./messages";
//ROUTES
router.use(`/${BASE_UL.AUTH}`, authRoutes);
router.use(`/${BASE_UL.UPLOADS}`, uploadRoutes);
router.use(`/${BASE_UL.CATEGORY}`, categoryRoutes);
router.use(`/${BASE_UL.BRANCH}`, branchRoutes);
router.use(`/${BASE_UL.USER}`, userRoutes);
router.use(`/${BASE_UL.PRODUCT}`, productRoutes);
router.use(`/${BASE_UL.POSTS}`, postRoutes);
router.use(`/${BASE_UL.MESSAGES}`, messagesRoutes);

export default router;
