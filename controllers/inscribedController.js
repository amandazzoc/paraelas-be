import inscribedService from "../services/inscribedService.js";
import { uploadPDF } from "../services/googleDriveService.js";

const getAllInscribed = async (req, res) => {
    try {
        const inscribeds = await inscribedService.getAll();
        res.status(200).json(inscribeds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createInscribed = async (req, res) => {
    const { name, email, phone, agreeLGPD, adult } = req.body;
    let AuthorizationTerm = null;

    try {
        if (req.file) {
            const driveResult = await uploadPDF(req.file.buffer, req.file.originalname);
            AuthorizationTerm = driveResult.webViewLink; 
        }

        const exists = await inscribedService.emailExists(email);
        if (exists) {
            return res.status(409).json({ message: "Email já cadastrado" });
        }
        
        const newInscribed = await inscribedService.create(name, email, phone, agreeLGPD, adult, AuthorizationTerm);
        res.status(201).json(newInscribed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getInscribedById = async (req, res) => {
    const { id } = req.params;

    try {
        const inscribed = await inscribedService.getById(id);
        res.status(200).json(inscribed);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default {
    getAllInscribed,
    createInscribed,
    getInscribedById
};