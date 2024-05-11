import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  refetchController,
} from "../controllers";
import { AuthMiddleware } from "../middleware";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/refetch", AuthMiddleware, refetchController);

export default router;
