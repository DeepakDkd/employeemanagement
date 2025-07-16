import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../model";
export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    );
    const user = await db.User.findByPk((decoded as any).id, {
      attributes: { exclude: ["password", "refreshToken"] },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }
    //@ts-ignore
    req.user = user; // Attach user to request object
    next(); 
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(403).json({ message: "Invalid or expired access token" });
  }
};
