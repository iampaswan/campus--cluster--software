import express from "express";
import { Response, Request } from "express";

const PORT = process.env.PORT

import { AppDataSource } from "./configuration/data-source";
import cookieParser from "cookie-parser";

import courseRouter from "./routes/courseRoute";

import "dotenv/config";
import { configDotenv } from "dotenv";

import dotenv from 'dotenv'

dotenv.config()



const app = express();


app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const frontendUrl = process.env.FRONTEND_URL;

  if (frontendUrl) {
    res.header('Access-Control-Allow-Origin', frontendUrl);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());

app.use('/course', courseRouter)



// connectDB()
AppDataSource.initialize()

app.get("/", (req: Request, res: Response) => {
  res.send("Course service is running at port 3001")

})

app.listen(PORT, () => {
  console.log(`Course service started at port ${PORT}`)
})


export default app;