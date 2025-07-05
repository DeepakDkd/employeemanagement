import { Request, Response } from "express";
import db from "../model/index";
import { ValidationError } from "sequelize";
// import bcrypt from 'bcrypt';
const bcrypt = require("bcrypt");

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await db.User.findAll();
    console.log("✅ Users fetched:", users.length);
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email, and password are required" });
      return;
    }

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: "User with this email already exists" });
      return;
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
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof ValidationError) {
      res.status(400).json({
        errorMessage: error.errors.map((err) => err.message).join(", "),
      });
      return;
    }
    res.status(500).json({ error: "Failed to create user" });
  }
};
