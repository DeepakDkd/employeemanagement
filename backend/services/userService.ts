import { Request, Response } from "express";
import db from "../model/index";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

import bcrypt from "bcrypt";

export const getAllUserService = async (
  req: Request,
  res: Response
): Promise<{ message: string; data: any }> => {
  const users = await db.User.findAll();
  console.log("✅ Users fetched:", users.length);

  if (users.length === 0) {
    throw new ApiError(404, "No users found");
  }

  return { message: "Users fetched successfully", data: users };
};

export const createUserService = async (
  req: Request
): Promise<{ message: string; user: any }> => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
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
  
  return { message: "User created successfully", user: newUser };
};