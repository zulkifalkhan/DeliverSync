import { Router } from "express";
import { createOrder } from "../../controllers/orders/order.controller";

const router = Router();

router.post("/orders", createOrder);

export default router;
