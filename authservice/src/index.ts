import 'dotenv/config';
import express, { Request, Response } from 'express'
import cookieParser from "cookie-parser";
import router from "./routes/authroutes";
import passport from 'passport';
import { AppDataSource } from './configuration/data-source';

const PORT = process.env.PORT

import "./configuration/passport";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

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

app.use('/auth', router)

app.get("/", (req: Request, res: Response) => {
  res.send("Authentication service is running at port 3001")

})

const startServer = async () => {
  try {
    await AppDataSource.initialize();

    app.listen(PORT, () => {
      console.log(`Authentication service started at port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    process.exit(1);
  }
};

startServer();


