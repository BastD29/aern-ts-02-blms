import express from "express";
import { createTodo } from "../controllers/todo";

const router = express.Router();

router.post("/create", createTodo);
// router.get("", getTodos);
// router.put("/update/:id", updateTodo);
// router.delete("/delete/:id", deleteTodo);

export default router;
