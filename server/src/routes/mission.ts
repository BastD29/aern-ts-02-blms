import express from "express";
import { createTable } from "../controllers/mission";

const router = express.Router();

router.post("/create/table", createTable);
// router.post("/create", createMission);
// router.get("", getMissions);
// router.put("/update/:id", updateMission);
// router.delete("/delete/:id", deleteMission);

export default router;
