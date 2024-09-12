import express from "express";
import { NomineeRoutes } from "./Routes/index.js";
import { connection } from "./DataBase/db.js";
import dotenv from 'dotenv';
import cors from "cors"
import bodyParser from'body-parser'

dotenv.config();

const app = express();

app.use(cors())
app.use(bodyParser.json())

app.use("/nominee" , NomineeRoutes)


app.listen(process.env.PORT , async () =>{
    console.log("Server is start" , process.env.PORT)
    try {
        await connection;
        console.log("database Connectd")
    } catch (error) {
        console.log(error)
    }
})