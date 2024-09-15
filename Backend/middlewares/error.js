
export const errorMiddleWare=(err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    err.message=err.message||"Internal Server Error"
    return res.status(statusCode).json({
        success:false,
        message:err.message,
    });
};