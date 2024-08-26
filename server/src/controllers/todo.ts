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

    await base("Table 1")
      .select({ view: "Grid view" })
      .eachPage(function page(pageRecords, fetchNextPage) {
        pageRecords.forEach((record) => {
          const todo: TodoType = {
            id: record.id as unknown as number, // Convert the ID to number if it's originally a string
            title: record.get("Title") as string, // Assuming the Airtable field is named "Title"
            description: record.get("Description") as string, // Assuming the Airtable field is named "Description"
          };
          //   console.log("todo:", todo);

          todos.push(todo);
        });
        fetchNextPage();
      });
    res.status(200).send({ message: "Todos retrieved successfully", todos });
  } catch (error) {
    res.status(500).send({ message: "Failed to retrieve todos", error });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export { createTodo, getTodos, updateTodo, deleteTodo };
