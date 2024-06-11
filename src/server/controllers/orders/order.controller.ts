import { Request, Response } from "express";
import { createNewOrder } from "../../../services/order";
import { sendOrderToQueue } from "../../../services/queue";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await createNewOrder(req.body);
    sendOrderToQueue(order); // Send the order to the queue after creation
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
