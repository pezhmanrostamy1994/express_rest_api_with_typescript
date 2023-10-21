import express from "express";
import { joiValidation } from "../../middlewares/validation";
const router = express.Router();

//CONTROLLER
import Controller from "../../controllers/v1/branch";
// VALIDATIONS
import {
  createBranchSchema,
  updateBranchSchema,
} from "../../validations/branch";
//MIDDLEWARES
import { asyncHandler, auth } from "../../middlewares";
import { ROLES } from "../../utils/const";
import { updateStatusSchema } from "../../validations/base";
router.get("/search", asyncHandler(Controller.search));
router.get("/", auth(ROLES.ADMIN.value), asyncHandler(Controller.getAll));
router.use(auth());
router.get("/withoutPaginate", asyncHandler(Controller.getAllWithoutPaginate));
router.get("/me", asyncHandler(Controller.myBranches));
router.get("/:id", asyncHandler(Controller.getOneById));
router.post(
  "/",
  joiValidation(createBranchSchema),
  asyncHandler(Controller.create)
);
router.put("/images", asyncHandler(Controller.updateImages));
router.put(
  "/status/:id",
  // auth(ROLES.ADMIN.value),
  joiValidation(updateStatusSchema),
  asyncHandler(Controller.updateStatus)
);
router.put(
  "/:id",
  joiValidation(updateBranchSchema),
  asyncHandler(Controller.update)
);

export default router;
