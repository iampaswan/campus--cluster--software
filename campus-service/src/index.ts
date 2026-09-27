import 'reflect-metadata';
import express, { Request, Response } from "express";
import { AppDataSource } from "./configuration/data-source";
import campusRouter from "./routes/campus.route";

import "dotenv/config";

import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

const app = express();

// Middleware
app.use(express.json());


app.use(express.json());

app.use('/campus', campusRouter)


AppDataSource.initialize()

app.get("/", (req: Request, res: Response) => {
  res.send("campus service is running")
})

app.listen(PORT, () => {
  console.log(`campus service started at port ${PORT}`)
})



// Home route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Node TS server is running",
  });
});




export default app;