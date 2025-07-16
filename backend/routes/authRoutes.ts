import { Router } from "express";
import { createUser } from "../controllers/userController";
import { login, logout } from "../controllers/authController";
import { verifyJWT } from "../middleware/auth.middleware";

const router: Router = Router();

// Login route
router.post("/login", login);

// Registration route
router.route("/register").post(createUser);

// Secure route: Logout
// @ts-ignore
router.route("/logout").post(verifyJWT, logout);


export default router;
