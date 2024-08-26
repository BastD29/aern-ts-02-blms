import { Request, Response } from "express";
import { base } from "../config/airtable";
import { TodoType } from "../types/todo";

const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .send({ message: "Title and description are required" });
    }

    const createdRecord = await base("Table 1").create({
      Title: title,
      Description: description,
    });

    // Update the record to include its ID in a specific column
    await base("Table 1").update(createdRecord.id, {
      Id: createdRecord.id, // Assuming you have a column named "Id"
    });

    const newTodo: TodoType = {
      id: createdRecord.id as unknown as number,
      title: createdRecord.fields.Title as string,
      description: createdRecord.fields.Description as string,
    };

    res.status(201).send({ message: "Todo created successfully", newTodo });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send({ message: "Failed to create todo", error });
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    const todos: TodoType[] = [];
    // console.log("todos:", todos);

    const records = await base("Table 1").select({ view: "Grid view" }).all();

    records.forEach((record) => {
      const todo: TodoType = {
        // id: record.id as unknown as number, // Convert the ID to number if it's originally a string
        id: record.get("Id") as unknown as number, // Assuming you have a column named "RecordID"
        title: record.get("Title") as string, // Assuming the Airtable field is named "Title"
        description: record.get("Description") as string, // Assuming the Airtable field is named "Description"
      };

      todos.push(todo);
    });
    res.status(200).send({ message: "Todos retrieved successfully", todos });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send({ message: "Failed to retrieve todos", error });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title && !description) {
      return res.status(400).send({ message: "Nothing to update" });
    }

    const fieldsToUpdate: Partial<{ Title: string; Description: string }> = {};
    if (title) fieldsToUpdate.Title = title;
    if (description) fieldsToUpdate.Description = description;

    const updatedRecord = await base("Table 1").update(id, fieldsToUpdate);

    const updatedTodo: TodoType = {
      id: updatedRecord.get("Id") as unknown as number,
      title: updatedRecord.get("Title") as string,
      description: updatedRecord.get("Description") as string,
    };

    res.status(200).send({ message: "Todo updated successfully", updatedTodo });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send({ message: "Failed to update todo", error });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await base("Table 1").destroy(id);

    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send({ message: "Failed to delete todo", error });
  }
};

export { createTodo, getTodos, updateTodo, deleteTodo };
