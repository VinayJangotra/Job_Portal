import express from "express";
import { getAllJobs,postjobs,getmyJobs,updateJob, deleteJob, getJobDetails } from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post",isAuthenticated,postjobs);
router.get("/getmyjobs",isAuthenticated,getmyJobs);
router.put("/update/:id",isAuthenticated,updateJob);
router.delete("/delete/:id", isAuthenticated, deleteJob);
router.get("/:id", isAuthenticated, getJobDetails);
export default router;
