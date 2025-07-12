import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/userController";

const router: Router = Router();

router.route("/").get(getAllUsers);
router.route("/create-user").post(createUser);

export default router;
