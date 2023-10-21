import express from "express";
const router = express.Router();

//CONTROLLER
import Controller from "../../controllers/v1/auth";
// VALIDATIONS
import { loginSchema, registerSchema } from "../../validations/index";
//MIDDLEWARES

import { joiValidation } from "../../middlewares/validation";
import { asyncHandler } from "../../middlewares";
router.get("/isAutorize", asyncHandler(Controller.isAutorize));
router.post(
  "/register",
  joiValidation(registerSchema),
  asyncHandler(Controller.register)
);

router.post(
  "/login",
  joiValidation(loginSchema),
  asyncHandler(Controller.login)
);

export default router;
