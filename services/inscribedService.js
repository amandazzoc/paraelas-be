import Inscribed from "../models/Inscribed.js";

class inscribedService {
    async getAll() {
        try {
            const inscribeds = await Inscribed.find();
            return inscribeds;
        } catch (error) {
            throw new Error("Could not fetch inscribed records");
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
                throw new Error("Email already exists");
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
            return newInscribed;
        } catch (error) {
            throw new Error("Could not create inscribed record");
        }
    }

    async getById(id) {
        try {
            const inscribed = await Inscribed.findById(id);
            if (!inscribed) {
                throw new Error("Inscribed record not found");
            }
            return inscribed;
        } catch (error) {
            throw new Error("Could not fetch inscribed record");
        }
    }
}

export default new inscribedService();