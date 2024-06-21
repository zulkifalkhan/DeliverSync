import Rider from "../services/database/rider.model";
import redisClient from "../framework/initRedis";
import * as IRider from "../repositories/rider/rider.repository";

export const createRider = async (riderData: any): Promise<any> => {
  return await IRider.createRider(riderData);
};

export const getRiderById = async (riderId: string): Promise<any> => {
  return await IRider.getRiderById(riderId);
};

export const updateRider = async (
  riderId: string,
  riderData: any
): Promise<any> => {
  return await IRider.updateRider(riderId, riderData);
};

export const deleteRider = async (riderId: string): Promise<any> => {
  return await IRider.deleteRider(riderId);
};

export const saveRiderLocation = async (
  riderId: string,
  location: { latitude: number; longitude: number }
) => {
  const key = `rider:${riderId}:location`;
  await redisClient.set(key, JSON.stringify(location));
  await redisClient.expire(key, 3600); // 1 hour expiry
};

export const updateRiderStatus = async (
  riderId: string,
  status: "available" | "unavailable" | "onDelivery"
) => {
  const key = `rider:${riderId}:status`;
  await redisClient.set(key, status);
  await redisClient.expire(key, 3600); // 1 hour expiry
};

export const getRiderLocation = async (riderId: string) => {
  const key = `rider:${riderId}:location`;
  const location = await redisClient.get(key);
  return location ? JSON.parse(location) : null;
};

export const getRiderStatus = async (riderId: string) => {
  const key = `rider:${riderId}:status`;
  return await redisClient.get(key);
};
