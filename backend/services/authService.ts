import db from "../model";
import { Request } from "express";
import bcrypt from "bcrypt";
import { generateAccessToken, generateAccessTokenAndRefreshToken } from "../utils/jwt";
import { generateRefreshToken } from "../utils/jwt";

export const registerService = async (
  req: Request
): Promise<{ message: string; user: any }> => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required");
  }

  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await db.User.create({
    name,
    email,
    password: hashedPassword,
  });
  const { password: _, ...userWithoutPassword } = newUser.toJSON();
  console.log("New user created");

  return { message: "User created successfully", user: userWithoutPassword };
};

export const loginService = async (req: Request) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await db.User.findOne({ where: { email } });
  console.log("User found:", user);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user.id);
 

  const updatedUser = await db.User.findByPk(user.id, {
    attributes: { exclude: ["password", "refreshToken"] },
  });

  return {
    message: "Login successful",
    accessToken,
    refreshToken,
    user: updatedUser,
  };
};
