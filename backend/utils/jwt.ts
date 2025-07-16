import jwt from "jsonwebtoken";
import db from "../model";
import { ApiError } from "./ApiError";
interface JwtPayload {
  id: string;
}
export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
}

export const generateAccessTokenAndRefreshToken = async (userId: any) => {
  try {
    const user = await db.User.findOne({ where: { id: userId } });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });
    await db.User.update(
      { refreshToken: refreshToken },
      { where: { id: user.id } }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new ApiError(500, "Failed to generate tokens");
  }
};