import { Request, Response } from "express";
import { createNewOrder } from "../../../services/order";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await createNewOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
