import InscribedController from "../controllers/InscribedController.js";  
import multer from "multer"; 
import express from "express";

const upload = multer();
const router = express.Router();

router.get("/", InscribedController.getAllInscribed);
router.post("/", upload.single("AuthorizationTerm"), InscribedController.createInscribed);
router.get("/:id", InscribedController.getInscribedById);

export default router;