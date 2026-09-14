import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const publicKey = process.env.JWT_PUBLIC_KEY!.replace(/\\n/g, '\n');
const privateKey = process.env.JWT_PRIVATE_KEY!.replace(/\\n/g, '\n');



export const generateAccessToken = (payload: Record<string, any>) => {
   return jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "1h",
   });
};

export const generateRefreshToken = (payload: Record<string, any>) => {
   return jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7d",
   });
};


export const verifyToken = (token: string) => {
   return jwt.verify(token, publicKey, { algorithms: ["RS256"] })
}