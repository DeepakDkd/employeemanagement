import db from "../model";
import { Request } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export const registerService = async (req: Request):Promise<{message:string,user:any}> => {
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
  const {password: _, ...userWithoutPassword} = newUser.toJSON();
  console.log("New user created");

  return { message: "User created successfully", user: userWithoutPassword };
};

export const loginService = async (req: Request) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateToken({ id: user.id, email: user.email });
  return { message: "Login successful", token };
};
