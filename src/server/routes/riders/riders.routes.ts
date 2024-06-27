import express from "express";
import * as riderController from "../../controllers/riders/riders.controller";
import { connectRider } from "../../controllers/riders/riders.controller";

const router = express.Router();

router.post("/", riderController.createRider);
router.get("/:id", riderController.getRiderById);
router.put("/:id", riderController.updateRider);
router.delete("/:id", riderController.deleteRider);

router.post("/connect", connectRider);

export default router;
