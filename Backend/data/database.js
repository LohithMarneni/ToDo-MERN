import mongoose from "mongoose";
const dbUrl=process.env.dbUrl;
export const connectDb=()=>{
    mongoose.connect(dbUrl,{
        dbName:"todo",
    }).then((c)=>{
        console.log(`Connected to database at ${c.connection.host}`);
    }).catch((err)=>{
        console.log(err,"error occured");
    });
};