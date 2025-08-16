import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function uploadPDF(buffer, filename) {
    const { data, error } = await supabase.storage
        .from("authorizations")
        .upload(filename, buffer, {
            contentType: "application/pdf",
        });

    if (error) {
        throw new Error(`Error uploading PDF: ${error.message}`);
    }

    const { data: publicURL } = supabase.storage
        .from("authorizations")
        .getPublicUrl(filename);

    return publicURL;
}