import { Request, Response } from "express";
import { loginService, registerService } from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await registerService(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await loginService(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to login user" });
  }
};
