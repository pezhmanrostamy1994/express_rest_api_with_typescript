import express from "express";
const router = express.Router();

//Require Routes
import apiV1 from "./v1";

router.use("/v1", apiV1);

export default router;
