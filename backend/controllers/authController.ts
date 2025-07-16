import db from "../model";
import jwt from "jsonwebtoken";
import { IUser } from "../types/user";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { generateAccessTokenAndRefreshToken } from "../utils/jwt";
import { loginService, registerService } from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await registerService(req.body);
    res
      .status(201)
      .json(new ApiResponse(200, "User registered successfully", result.user));
  } catch (error) {
    console.error("Error during registration:", error);
    throw new ApiError(500, "Failed to register user");
  }
};
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await loginService(req);

    res
      .status(200)
      .cookie("accessToken", user.accessToken, {
        httpOnly: true,
        secure: true,
      })
      .cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        secure: true,
      })
      .json(new ApiResponse(200, "User logged in successfully", user.user));
  } catch (error: any) {
    console.error("Error during login:", error);
    throw new ApiError(500, "Failed to login user", error.message);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    await db.User.update(
      { refreshToken: undefined },
      // @ts-ignore
      { where: { id: req.user.id } }
    );
    res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json(new ApiResponse(200, "User logged out successfully", {}));
  } catch (error) {
    console.error("Error during logout:", error);
    throw new ApiError(500, "Failed to logout user");
  }
};

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
      throw new ApiError(401, "Refresh token is required");
    }
    try {
      const decoded = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      );
      const user: IUser = (await db.User.findOne({
        where: { id: (decoded as any).id, refreshToken: incomingRefreshToken },
      })) as IUser;
      if (!user) {
        throw new ApiError(403, "Invalid refresh token");
      }
      if (user.refreshToken !== incomingRefreshToken) {
        throw new ApiError(403, "Refresh token mismatch");
      }
      const { accessToken, refreshToken: newRefreshToken } =
        await generateAccessTokenAndRefreshToken(user.id);

      res
        .status(200)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
        })
        .cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
        })
        .json(
          new ApiResponse(200, "Access token refreshed successfully", {
            accessToken,
            refreshToken: newRefreshToken,
          })
        );
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw new ApiError(500, "Failed to refresh access token");
    }
  }
);
