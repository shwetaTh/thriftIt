import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDb connected Db host: `);
    } catch (error) {
        console.log("Mongodb connect error", error);
        process.exit(1)
    }
}

export default connectDB