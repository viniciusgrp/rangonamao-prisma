import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.post("/", UserController.createUser)
router.get("/", UserController.getUsers)
router.get("/:id", UserController.getUserById)
router.put("/:id", UserController.updateUser)

export default router