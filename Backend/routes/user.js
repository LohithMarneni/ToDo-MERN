import express from "express";
import {
  getMyProfile,
  login,
  register,
  signOut,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.post("/signup", register);
router.post("/login", login);
router.get("/signout",isAuthenticated, signOut);
router.get("/me",isAuthenticated,getMyProfile);
export default router;
