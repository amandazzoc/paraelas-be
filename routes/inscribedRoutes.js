import InscribedController from "../controllers/InscribedController.js";  
import multer from "multer"; 
import express from "express";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

router.get("/", InscribedController.getAllInscribed);
router.post("/", upload.single("AuthorizationTerm"), InscribedController.createInscribed);
router.get("/:id", InscribedController.getInscribedById);

export default router;