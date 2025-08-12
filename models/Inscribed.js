import mongoose from "mongoose";

const inscribedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    agreeLGPD: {
        type: Boolean,
        required: true,
    },
    adult: {
        type: Boolean,
        required: true,
    },
    AuthorizationTerm: {
        type: String
    }
});

const Inscribed = mongoose.model("Inscribed", inscribedSchema);
export default Inscribed;