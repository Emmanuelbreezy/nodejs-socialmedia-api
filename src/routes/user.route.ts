import express from "express";
import { getUserByIdController } from "../controllers";
//import { AuthMiddleware } from "../middleware";

const router = express.Router();

router.get("/user/:userId", getUserByIdController);

export default router;
