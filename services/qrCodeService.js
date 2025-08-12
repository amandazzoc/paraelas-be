import QRCode from "qrcode";

export async function generateAndSaveQRCode(text) {
  try {
    console.log(`Gerando QR Code para: ${text}`);

    const base64 = await QRCode.toDataURL(text, {
      type: "image/png",
      width: 300,
    });

    console.log(`QR Code gerado: ${base64}`);
    return base64;
  } catch (err) {
    throw new Error("Não foi possível gerar o QR Code.");
  }
};