import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/userController";
import { login } from "../controllers/authController";

const router: Router = Router();

router.route("/").get(getAllUsers);

export default router;
