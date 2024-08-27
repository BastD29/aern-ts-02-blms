import express from "express";
import { createFreelance } from "../controllers/freelance";

const router = express.Router();

router.post("/create/freelance", createFreelance);
// router.get("", getMissions);
// router.put("/update/:id", updateMission);
// router.delete("/delete/:id", deleteMission);

export default router;
