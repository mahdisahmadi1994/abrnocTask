import express from "express"

import loginUser from "../controller/auth_contorller.js";
import registerUser from "../controller/register_controller.js";

const router = express.Router();


router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

export default router;
