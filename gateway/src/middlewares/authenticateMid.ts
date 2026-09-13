import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

import { verifyToken } from "../utilities/utils";


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
   try {
      let token: string | undefined;

      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith("Bearer ")) {
         token = authHeader.split(" ")[1];
      }
      console.log("header", authHeader)

      if (!token && typeof req.query.token === "string") {
         token = req.query.token;
      }

      if (!token) {
         return res
            .status(401)
            .json({ message: "Missing Authorization token" });
      }

      const payload = verifyToken(token) as JwtPayload | string;

      if (typeof payload === "string") {
         return res.status(403).json({ message: "Invalid token format" });
      }

      console.log("JWT Payload:", payload);

      (req as any).user = {
         id: payload.userId as string,
      };
      console.log("Authenticated user ID:", payload.userId);

      req.headers["x-user-id"] = payload.userId as string;

      next();
   } catch (error) {
      console.error("JWT authentication error:", error);
      res.status(403).json({ message: "Invalid or expired token" });
   }
};






export const authenticateJWT_SSE = (req: Request, res: Response, next: NextFunction) => {
   const token = req.query.token as string;
   if (!token) {
      return res.status(401).end();
   }

   try {
      verifyToken(token)
      next();
   } catch {
      return res.status(401).end();
   }
};
