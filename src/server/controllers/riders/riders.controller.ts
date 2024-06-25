import { Request, Response } from "express";
import * as riderService from "../../../services/rider";

export const createRider = async (req: Request, res: Response) => {
  try {
    const rider = await riderService.createRider(req.body);
    res.status(201).json(rider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRiderById = async (req: Request, res: Response) => {
  try {
    const rider = await riderService.getRiderById(req.params.id);
    res.json(rider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRider = async (req: Request, res: Response) => {
  try {
    const rider = await riderService.updateRider(req.params.id, req.body);
    res.json(rider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRider = async (req: Request, res: Response) => {
  try {
    await riderService.deleteRider(req.params.id);
    res.json({ message: "Rider deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};