import express from "express";
import { login, register,logout, getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout",isAuthenticated,logout);
// router.get("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.status(200).json({ success: true, message: "Logged out successfully" });
// });
router.get("/getuser",isAuthenticated,getUser);
export default router;
