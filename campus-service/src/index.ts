import express, { Request, Response } from "express";

import campusRouter from "./routes/campus.route";

const app = express();

// Middleware
app.use(express.json());


app.use(express.json());

app.use('/campus', campusRouter)



// Home route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Node TS server is running",
  });
});




export default app;