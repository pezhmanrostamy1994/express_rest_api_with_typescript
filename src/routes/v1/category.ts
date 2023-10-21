import express from "express";
const router = express.Router();

//CONTROLLER
import Controller from "../../controllers/v1/category";

// VALIDATIONS
import {
  createCategorySchema,
  updateCategorySchema,
} from "../../validations/index";
//MIDDLEWARES

import { joiValidation } from "../../middlewares/validation";
import { asyncHandler } from "../../middlewares";

//ROUTES
router.get("/", asyncHandler(Controller.getAll));
router.get("/withoutPaginate", asyncHandler(Controller.getAllWithoutPaginate));
router.get("/:id", asyncHandler(Controller.getById));
router.post(
  "/",
  joiValidation(createCategorySchema),
  asyncHandler(Controller.create)
);

router.put(
  "/:id",
  joiValidation(updateCategorySchema),
  asyncHandler(Controller.udpateOne)
);

export default router;
