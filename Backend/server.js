import { app } from "./app.js";
import { connectDb } from "./data/database.js";
connectDb();
const port=process.env.port;
app.listen(port,()=>{
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
});
