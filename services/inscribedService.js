import Inscribed from "../models/Inscribed.js";
import { generateAndSaveQRCode } from "./qrCodeService.js";
import { sendEmail } from "./emailService.js";

class inscribedService {
    async getAll() {
        try {
            const inscribeds = await Inscribed.find();
            return inscribeds;
        } catch (error) {
            throw new Error("Não foi possível buscar os inscritos.");
        }
    }

    async emailExists(email) {
        const user = await Inscribed.findOne({ email });
        return !!user;
    }

    async create(name, email, phone, agreeLGPD, adult, AuthorizationTerm) {
        try {
            const exists = await this.emailExists(email);
            if (exists) {
                throw new Error("Este e-mail já está cadastrado.");
            }

            const newInscribed = new Inscribed({
                name,
                email,
                phone,
                agreeLGPD,
                adult,
                AuthorizationTerm
            });
            await newInscribed.save();

            const url = `${process.env.BASE_URL}/inscrito/${newInscribed._id}`;
            const filename = `qrcode_${newInscribed._id}.png`;
            const qrCodePath = await generateAndSaveQRCode(url, filename);

            if (!qrCodePath) {
                throw new Error("Não foi possível gerar o QR Code.");
            }
            
            const qrCodeUrl = `${process.env.BASE_URL}/${qrCodePath}`;
            await sendEmail(email, qrCodeUrl);

            return newInscribed;
        } catch (error) {
            throw new Error(error.message || "Não foi possível criar o inscrito.");
        }
    }

    async getById(id) {
        try {
            const inscribed = await Inscribed.findById(id);
            if (!inscribed) {
                throw new Error("Inscrito não encontrado.");
            }
            return inscribed;
        } catch (error) {
            throw new Error("Não foi possível buscar o inscrito.");
        }
    }
}

export default new inscribedService();