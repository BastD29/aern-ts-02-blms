import { Request, Response } from "express";
import { base } from "../config/airtable";

const createFreelance = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email } = req.body;
  } catch (error) {}
};

export { createFreelance };
