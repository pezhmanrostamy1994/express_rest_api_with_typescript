import express from "express";
const router = express.Router();

//CONTROLLER
import Controller from "../../controllers/v1/user";

// VALIDATIONS
//MIDDLEWARES

import { asyncHandler, auth } from "../../middlewares";

//ROUTES
router.get("/", asyncHandler(Controller.getAll));
router.get("/me", auth(), asyncHandler(Controller.getMe));
router.get("/withoutPaginate", asyncHandler(Controller.getAllWithoutPaginate));
router.get("/user", asyncHandler(Controller.getOne));
router.put("/me", auth(), asyncHandler(Controller.updateOne));
router.get("/:id", asyncHandler(Controller.getById));

export default router;
