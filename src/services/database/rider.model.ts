import mongoose, { Schema, Document } from "mongoose";

export interface IRider extends Document {
  name: string;
  availabilityStatus: string;
  location: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
  contactInfo: {
    phoneNumber: string;
    email: string;
  };
  vehicleInfo: {
    type: string;
    model: string;
    registrationNumber: string;
  };
  rating: number;
  feedback: string;
}

const RiderSchema: Schema = new Schema({
  name: { type: String, required: true },
  availabilityStatus: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], default: [0, 0] },
  },
  contactInfo: {
    phoneNumber: { type: String },
    email: { type: String },
  },
  vehicleInfo: {
    type: { type: String },
    model: { type: String },
    registrationNumber: { type: String },
  },
  rating: { type: Number, default: 0 },
  feedback: { type: String },
});

RiderSchema.index({ location: "2dsphere" }); // Index for geospatial queries

export default mongoose.model<IRider>("Rider", RiderSchema);
