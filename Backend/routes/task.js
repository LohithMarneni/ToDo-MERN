import express from "express";
import { deleteTask, getMyTasks, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.post("/addtask",isAuthenticated,newTask);
router.get("/gettasks",isAuthenticated,getMyTasks);
router.route("/:id").patch(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)
export default router;