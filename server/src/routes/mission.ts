import express from "express";
import { createMission } from "../controllers/mission";

const router = express.Router();

router.post("/create", createMission);
// router.get("", getMissions);
// router.put("/update/:id", updateMission);
// router.delete("/delete/:id", deleteMission);

export default router;
