import { Request, Response } from "express";

export const getAllProducts = (req: Request, res: Response) => {
  res.send("hello world");
};
