import { Router } from "express";
import {
    login,
    logout,
    refreshAccessToken,
} from "../controllers/authController";
import { createUser } from "../controllers/userController";
import { verifyJWT } from "../middleware/auth.middleware";

const router: Router = Router();

// Login route
router.post("/login", login);

// Registration route
router.route("/register").post(createUser);

// Secure route: Logout
// @ts-ignore
router.route("/logout").post(verifyJWT, logout);

// router.route("/refresh-token").post(refreshAccessToken);

export default router;
