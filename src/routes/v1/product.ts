import express from "express";
import { joiValidation } from "../../middlewares/validation";
const router = express.Router();

//CONTROLLER
import Controller from "../../controllers/v1/product";
// VALIDATIONS
import {
  createProductSchema,
  updateProductSchema,
} from "../../validations/product";
//MIDDLEWARES
import { asyncHandler, auth } from "../../middlewares";
import { ROLES } from "../../utils/const";
import { updateStatusSchema } from "../../validations/base";

router.get("/", asyncHandler(Controller.getAll));
router.get("/search", asyncHandler(Controller.search));
router.get("/withoutPaginate", asyncHandler(Controller.getAllWithoutPaginate));
router.get("/:id", asyncHandler(Controller.getOneById));
router.post(
  "/",
  joiValidation(createProductSchema),
  asyncHandler(Controller.create)
);
router.put("/images", asyncHandler(Controller.updateImages));
router.put(
  "/status/:id",
  auth(ROLES.ADMIN.value),
  joiValidation(updateStatusSchema),
  asyncHandler(Controller.updateStatus)
);
router.put(
  "/:id",
  joiValidation(updateProductSchema),
  asyncHandler(Controller.update)
);

export default router;
