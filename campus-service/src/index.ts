import express, { Request, Response } from "express";

const app = express();

// Middleware
app.use(express.json());

// Home route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Node TS server is running",
  });
});




export default app;