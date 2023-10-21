import express from "express";
import { joiValidation } from "../../middlewares/validation";
const router = express.Router();

//CONTROLLER
import Controller from "../../controllers/v1/post";
// VALIDATIONS
import { createPostSchema, updatePostSchema } from "../../validations/post";
//MIDDLEWARES
import { asyncHandler, auth } from "../../middlewares";
import { ROLES } from "../../utils/const";
import { updateStatusSchema } from "../../validations/base";

router.get("/", asyncHandler(Controller.getAll));
router.get("/:id/similarity", asyncHandler(Controller.getAllSimilarity));
router.get("/search", asyncHandler(Controller.search));
router.get("/mine", auth(), asyncHandler(Controller.getMine));
router.get("/withoutPaginate", asyncHandler(Controller.getAllWithoutPaginate));
router.get("/:id", asyncHandler(Controller.getOneById));
router.post(
  "/",
  auth(),
  joiValidation(createPostSchema),
  asyncHandler(Controller.create)
);
router.put("/images", asyncHandler(Controller.updateImages));
router.put(
  "/status/:id",
  auth(),
  auth(ROLES.ADMIN.value),
  joiValidation(updateStatusSchema),
  asyncHandler(Controller.updateStatus)
);
router.put(
  "/:id",
  joiValidation(updatePostSchema),
  asyncHandler(Controller.update)
);

export default router;
