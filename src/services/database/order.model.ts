import mongoose, { Schema, Document, Types } from "mongoose";

// Define the possible statuses as an enum
export enum OrderStatus {
  Pending = "pending",
  Assigned = "assigned",
  Delivered = "delivered",
}

// Extend the IOrder interface to include the status enum and riderId
export interface IOrder extends Document {
  customerName: string;
  items: string[];
  totalAmount: number;
  status: OrderStatus;
  riderId?: Types.ObjectId; // Optional field to store the rider's ID
}

const OrderSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  items: { type: [String], required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "pending" },
  riderId: { type: Schema.Types.ObjectId, ref: "Rider", default: null }, // Reference to the Rider
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
