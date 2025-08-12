export function getEmailHtml() {
  return `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background-color: #fafafa;">
            <h1 style="color: #a823d2; text-align: center; margin-bottom: 0;">Para Elas - Evento de Tecnologia para Mulheres</h1>
            <p style="font-size: 16px; font-weight: 600; text-align: center; margin-top: 5px; margin-bottom: 25px; color: #555;">
                Bem-vinda ao <strong>"Para Elas"</strong> - Evento de Tecnologia para Mulheres!
            </p>

            <p style="font-size: 14px; margin-bottom: 10px;">
                O evento acontecerá no dia <strong>11 de dezembro</strong>, das <strong>18h30 às 22h</strong>.
            </p>
            <p style="font-size: 14px; margin-bottom: 25px;">
                <strong style="color: #a823d2;">Lembre-se:</strong> a inscrição <strong>não garante a vaga</strong>; a confirmação da sua participação será feita pela comissão via WhatsApp.
            </p>

            <p style="font-size: 14px; margin-bottom: 15px;">
                Obrigado por se inscrever no evento! Aqui está o seu código QR anexado para acesso.
            </p>
            <p style="font-size: 14px; margin-bottom: 15px;">
                <strong>Importante:</strong> Apresente o seu QR Code no dia do evento para garantir a entrada. Caso seja menor de idade, é obrigatório levar a autorização impressa e assinada por um responsável.
            </p>

            <p style="font-size: 12px; color: #777; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
                Este é um email automático, por favor, não responda.
            </p>
        </div>
    `;
}
