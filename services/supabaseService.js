import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

function normalizeFileName(filename) {
    return filename
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

export async function uploadPDF(buffer, filename) {
    const normalizedFilename = normalizeFileName(filename);
    const uuid = uuidv4();
    const finalFilename = `${uuid}_${normalizedFilename}`;

    const { data, error } = await supabase.storage
        .from("authorizations")
        .upload(finalFilename, buffer, {
            contentType: "application/pdf",
        });

    if (error) {
        throw new Error(`Error uploading PDF: ${error.message}`);
    }

    const { data: publicURL } = supabase.storage
        .from("authorizations")
        .getPublicUrl(finalFilename);

    return publicURL;
}