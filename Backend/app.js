import express from "express";
import userRoute from "./routes/user.js";
import taskRoute from "./routes/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from 'cors';
export const app=express();
config({
    path:"./data/config.env",
});
//using middlewares
app.use(express.json());//need to be before userRoute
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE","PATCH"],
    credentials:true,
}))
// using routes
app.use("/api/v1/users",userRoute);
 
app.use("/api/v1/tasks",taskRoute);
app.get("/",(req,res)=>{
    res.send("This is default page");
});
app.use(errorMiddleWare);


