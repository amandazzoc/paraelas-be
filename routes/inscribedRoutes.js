import InscribedController from "../controllers/InscribedController.js";   
import express from "express";

const router = express.Router();

router.get("/", InscribedController.getAllInscribed);
router.post("/", InscribedController.createInscribed);
router.get("/:id", InscribedController.getInscribedById);

export default router;