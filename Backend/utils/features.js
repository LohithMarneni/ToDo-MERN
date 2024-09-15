import jwt from "jsonwebtoken";
export default class errorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        // Capture the stack trace (useful for debugging) - given by ai
        Error.captureStackTrace(this, this.constructor);
    }
}
export const sendCookie=(user,res,message,statusCode=200)=>{
    const token=jwt.sign({
        _id:user._id
    },process.env.JWT_SECRET)
    res.status(statusCode).cookie("token",token,{
         httpOnly:true,
         maxAge:10*60*1000,
         sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
         secure:process.env.NODE_ENV==="Development"?false:true,
    }).json({
        success:true,
        message,
    });
}