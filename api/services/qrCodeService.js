import QRCode from "qrcode";
import path from "path";

export async function generateAndSaveQRCode(text, filename) {
  try {
    console.log(`Gerando QR Code para: ${text}`);
    const qrDir = path.resolve(process.cwd(), "uploads/qrCodes");
    await QRCode.toFile(path.resolve(qrDir, filename), text, {
      type: "png",
      width: 300, 
    });

    console.log(`QR Code gerado: ${qrDir}/${filename}`);
    return `uploads/qrCodes/${filename}`;
  } catch (err) {
    throw new Error("Não foi possível gerar o QR Code.");
  }
};