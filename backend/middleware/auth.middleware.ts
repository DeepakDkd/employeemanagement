import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../model";
import { generateAccessTokenAndRefreshToken } from "../utils/jwt";

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken =
      req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
    const refreshToken = req.cookies?.refreshToken;

    let user: any = null;

    if (accessToken) {
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!
      ) as { id: string };

      user = await db.User.findByPk(decoded.id, {
        attributes: { exclude: ["password", "refreshToken"] },
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid Access Token" });
      }
    }

    else if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as { id: string };

      user = await db.User.findByPk(decoded.id, {
        attributes: { exclude: ["password", "refreshToken"] },
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid Refresh Token" });
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await generateAccessTokenAndRefreshToken(user.id);

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    (req as any).user = user;

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
