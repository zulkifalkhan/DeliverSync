import { IOrder } from "../../services/database/order.model";
import Order from "../../services/database/order.model";
import { Types } from "mongoose";

class OrderRepository {
  async createOrder(orderData: IOrder): Promise<IOrder> {
    const order = new Order(orderData);
    return await order.save();
  }

  async findOrderById(orderId: string): Promise<IOrder | null> {
    return await Order.findById(orderId);
  }

  async updateOrderStatus(
    orderId: string,
    status: string
  ): Promise<IOrder | null> {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  }

  async assignRider(
    orderId: string,
    riderId: Types.ObjectId
  ): Promise<IOrder | null> {
    return await Order.findByIdAndUpdate(
      orderId,
      { riderId, status: "assigned" },
      { new: true }
    );
  }
}

export default new OrderRepository();
