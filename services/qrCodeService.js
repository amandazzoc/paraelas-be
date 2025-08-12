import QRCode from "qrcode";
import path from "path";

export async function generateAndSaveQRCode(text, filename) {
  try {
    const qrDir = path.resolve(process.cwd(), "uploads/qrCodes");
    await QRCode.toFile(path.resolve(qrDir, filename), text, {
      type: "png",
      width: 300, 
    });

    return `uploads/qrCodes/${filename}`;
  } catch (err) {
    throw new Error("Não foi possível gerar o QR Code.");
  }
};