import inscribedService from "../services/inscribedService.js";
import { uploadPDF } from "../services/supabaseService.js";

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

    console.log("Recebendo solicitação para criar inscrito:", { name, email, phone, agreeLGPD, adult });

    try {
        if (req.file) {
            console.log("Arquivo recebido:", req.file.originalname);
            const supabaseResult = await uploadPDF(req.file.buffer, req.file.originalname);
            AuthorizationTerm = supabaseResult.publicUrl;
            console.log("Arquivo enviado para o Supabase. Link:", AuthorizationTerm);
        }

        const exists = await inscribedService.emailExists(email);
        console.log("Verificando se o email já existe:", email, "Resultado:", exists);
        if (exists) {
            console.warn("Tentativa de cadastro com email já existente:", email);
            return res.status(409).json({ message: "Email já cadastrado" });
        }
        
        const newInscribed = await inscribedService.create(name, email, phone, agreeLGPD, adult, AuthorizationTerm);
        console.log("Novo inscrito criado com sucesso:", newInscribed);
        res.status(201).json(newInscribed);
    } catch (error) {
        console.error("Erro ao criar inscrito:", error);
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