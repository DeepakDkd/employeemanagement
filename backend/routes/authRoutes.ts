import { Router } from "express";
import { createUser } from "../controllers/userController";
import { login } from "../controllers/authController";

const router: Router = Router();

router.get("/login", login)

router.post("/register",createUser);