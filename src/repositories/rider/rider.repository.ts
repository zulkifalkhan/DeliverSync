import { IRider } from "../../services/database/rider.model";
import Rider from "../../services/database/rider.model";

export const createRider = async (riderData: any): Promise<IRider> => {
  return await Rider.create(riderData);
};

export const getRiderById = async (riderId: string): Promise<IRider | null> => {
  return await Rider.findById(riderId);
};

export const updateRider = async (
  riderId: string,
  riderData: any
): Promise<IRider | null> => {
  return await Rider.findByIdAndUpdate(riderId, riderData, { new: true });
};

export const deleteRider = async (riderId: string): Promise<void> => {
  await Rider.findByIdAndDelete(riderId);
};