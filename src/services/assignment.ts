import {
  getRiderLocation,
  getRiderStatus,
  updateRiderStatus,
} from "../services/rider";
import { IOrder } from "./database/order.model";
import redisClient from "../framework/initRedis";
import * as Rider from "../services/rider";

const calculateDistance = (
  loc1: { lat: number; lng: number },
  loc2: { lat: number; lng: number }
) => {
  // Implement the Haversine formula or use a library for distance calculation
  const R = 6371; // Radius of the Earth in km
  const dLat = ((loc2.lat - loc1.lat) * Math.PI) / 180;
  const dLng = ((loc2.lng - loc1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((loc1.lat * Math.PI) / 180) *
      Math.cos((loc2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const assignRiderToOrder = async (order: IOrder) => {
  const riderKeys = await redisClient.keys("rider:*:status");
  let nearestRiderId = null;
  let minDistance = Infinity;

  for (const key of riderKeys) {
    const riderId = key.split(":")[1];
    const status = await getRiderStatus(riderId);

    if (status === "available") {
      const location = await getRiderLocation(riderId);
      if (location) {
        const distance = calculateDistance(location, order.deliveryLocation);
        if (distance < minDistance) {
          minDistance = distance;
          nearestRiderId = riderId;
        }
      }
    }
  }

  if (nearestRiderId) {
    await updateRiderStatus(nearestRiderId, "onDelivery");
    await Rider.updateRider(nearestRiderId, {
      assignedOrderId: order._id,
    });
    return nearestRiderId;
  } else {
    throw new Error("No available riders");
  }
};
