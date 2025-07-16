import db from "../model/index";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { getAllUserService } from "../services/userService";

// import bcrypt from 'bcrypt';
const bcrypt = require("bcrypt");

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await getAllUserService(req, res);
    if (!result) {
      throw new ApiError(404, "No users found");
    }
    if (result.data.length === 0) {
      throw new ApiError(404, "No users found");
    }
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result.data,
      errors: [],
    });
  }
);

export const createUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // try {
    const { name, email, password } = req.body;
    if (["name", "email", "password"].some((field) => !req.body[field])) {
      throw new ApiError(400, "Name, email, and password are required");
    }

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await db.User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("New user created:", newUser);

    // Exclude password from the response

    newUser.password = "";
    res
      .status(201)
      .json(new ApiResponse(200, "User created successfully", newUser));
  }
);
