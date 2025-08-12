import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  ),
  scopes: SCOPES,
});

export async function uploadPDF(buffer, filename) {
  const drive = google.drive({ version: "v3", auth: await auth.getClient() });

  const fileMetadata = {
    name: filename,
    parents: ["111-2c4r6gLThO1B4SjemKCeFho1CxCi5"],
  };

  const media = {
    mimeType: "application/pdf",
    body: Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer),
  };

  const res = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: "id, webViewLink",
  });

  return res.data;
}