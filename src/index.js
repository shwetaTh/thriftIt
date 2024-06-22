import dotenv, { config } from "dotenv"
dotenv.config({
    path:'.env'
})

import mongoose from "mongoose"
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

connectDB()

/*
import express from "express"
const app = express()
console.log(process.env.PORT);

;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("Error: ", error);
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App running on port ${process.env.PORT}`);
        })
        
    } catch (error) {
        console.error("Error: ",error);
    }
})()
*/    