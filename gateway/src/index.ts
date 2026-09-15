import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT
console.log(PORT)

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import proxy from 'express-http-proxy'
import { authenticateJWT } from "./middlewares/authenticateMid";

const FRONTEND_URL = process.env.FRONTEND_URL
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL as string
const COURSE_SERVICE_URL = process.env.COURSE_SERVICE_URL as string

const app = express()
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}))
app.use(express.json());



const authServiceProxy = proxy(AUTH_SERVICE_URL)


app.post('/auth/register', (req: Request, res: Response, next: NextFunction) => {
  authServiceProxy(req, res, next)
})
app.post('/auth/login', (req: Request, res: Response, next: NextFunction) => {
  authServiceProxy(req, res, next)
})
app.post('/auth/refresh', (req: Request, res: Response, next: NextFunction) => {
  authServiceProxy(req, res, next)
})
app.get('/auth/google', (req: Request, res: Response, next: NextFunction) => {
  authServiceProxy(req, res, next)
})
app.get('/auth/google/callback', (req: Request, res: Response, next: NextFunction) => {
  authServiceProxy(req, res, next)
})
app.get('/auth/me', authenticateJWT, (req: Request, res: Response, next: NextFunction) => {
  authServiceProxy(req, res, next)
})



const courseServiceProxy = proxy(COURSE_SERVICE_URL)
app.post('/course/create', authenticateJWT, (req: Request, res: Response, next: NextFunction) => {
  courseServiceProxy(req, res, next)
})
app.get('/course/my', authenticateJWT, (req: Request, res: Response, next: NextFunction) => {
  courseServiceProxy(req, res, next)
})


app.listen(PORT, () => {
  console.log(`API Gateway is running at port ${PORT}`)
})