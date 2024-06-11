import orderRepository from "../repositories/order/order.repository";
import { Types } from "mongoose";

export const createNewOrder = async (orderData: any) => {
  return await orderRepository.createOrder(orderData);
};

export const getOrderById = async (orderId: string) => {
  return await orderRepository.findOrderById(orderId);
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  return await orderRepository.updateOrderStatus(orderId, status);
};

export const assignRiderToOrder = async (orderId: string, riderId: string) => {
  return await orderRepository.assignRider(
    orderId,
    new Types.ObjectId(riderId)
  );
};
