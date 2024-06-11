import Rider from "../services/database/rider.model";

export const createRider = async (riderData: any): Promise<any> => {
  return await Rider.create(riderData);
};

export const getRiderById = async (riderId: string): Promise<any> => {
  return await Rider.findById(riderId);
};

export const updateRider = async (
  riderId: string,
  riderData: any
): Promise<any> => {
  return await Rider.findByIdAndUpdate(riderId, riderData, { new: true });
};

export const deleteRider = async (riderId: string): Promise<any> => {
  return await Rider.findByIdAndDelete(riderId);
};
