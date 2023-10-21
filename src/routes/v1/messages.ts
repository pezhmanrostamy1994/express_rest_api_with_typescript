import express from "express";
const router = express.Router();

//CONTROLLER
import Controller from "../../controllers/v1/message";

//MIDDLEWARES
import { asyncHandler, auth } from "../../middlewares";

//ROUTES
router.use(auth());
router.get("/", asyncHandler(Controller.getAll));
router.get("/getAllUnSeen", asyncHandler(Controller.getAllUnSeen));
router.put("/seenMessages", asyncHandler(Controller.seenMessages));

export default router;
