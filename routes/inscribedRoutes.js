import InscribedController from "../controllers/inscribedController.js";  
import multer from "multer"; 
import express from "express";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", InscribedController.getAllInscribed);
router.post("/", upload.single("AuthorizationTerm"), InscribedController.createInscribed);
router.get("/:id", InscribedController.getInscribedById);

export default router;