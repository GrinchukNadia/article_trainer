import jsPDF from "jspdf";
import tektur from "../../../../assets/fonts/static/NotoSans_Condensed-Light.ttf";

type RecoveryPdfData = {
    username: string;
    recoveryCode: string;
};



export async function downloadRecoveryPdf(data: RecoveryPdfData) {
    const doc = new jsPDF();
    const font = await fetch(tektur).then(res => res.arrayBuffer());

    function arrayBufferToBase64(buffer: ArrayBuffer) {
        let binary = "";

        const bytes = new Uint8Array(buffer);

        const len = bytes.byteLength;

        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    }

    const fontBase64 = arrayBufferToBase64(font);
    const fileName = `ArtikelTrainerRecoveryData.pdf`;

    doc.addFileToVFS("Tektur_Condensed-Medium.ttf", fontBase64);
    doc.addFont("Tektur_Condensed-Medium.ttf", "tektur", "normal");
    doc.setFont("tektur");
    let y = 20;
    doc.setFontSize(22);

    // TITLE
    doc.text("LingoStein Account Recovery", 20, y);

    y += 20;

    // RUSSIAN
    doc.setFontSize(12);
    doc.text(
        "Этот файл содержит данные для восстановления аккаунта.", 20, y);

    y += 8;

    doc.text(
        "С помощью этих данных вы сможете восстановить доступ к аккаунту в случае потери доступа.", 20, y);

    y += 14;

    doc.setFontSize(13);

    doc.text("Важно:", 20, y);

    y += 8;

    doc.setFontSize(12);

    doc.text("Для восстановления аккаунта необходимы: код восстановления и имя.", 20, y);

    y += 8;

    doc.text("Рекомендуется хранить этот файл в надежном и безопасном месте.", 20, y);

    y += 8;

    doc.text("Без этих данных восстановление аккаунта может быть невозможно.", 20, y);

    y += 18;

    doc.setFontSize(14);

    doc.text(`Имя пользователя: ${data.username}`, 20, y);

    y += 12;

    doc.text(`Код восстановления: ${data.recoveryCode}`, 20, y);

    y += 25;

    // GERMAN

    y += 12;

    doc.setFontSize(12);

    doc.text("Diese Datei enthält deine Wiederherstellungsdaten.", 20, y);

    y += 8;

    doc.text("Mit diesen Daten kannst du deinen Account wiederherstellen, falls du den Zugriff verlierst.", 20, y);

    y += 14;

    doc.setFontSize(13);

    doc.text("Wichtig:", 20, y);

    y += 8;

    doc.setFontSize(12);

    doc.text("Zur Wiederherstellung deines Accounts werden der Recovery-Code und dein Benutzname benötigt.", 20, y);

    y += 8;

    doc.text("Bewahre diese Datei an einem sicheren Ort auf. Ohne diese Daten kann dein Account", 20, y);

    y += 8;

    doc.text("möglicherweise nicht wiederhergestellt werden.", 20, y);

    y += 18;

    doc.setFontSize(14);

    doc.text(`Benutzername: ${data.username}`, 20, y);

    y += 12;

    doc.text(`Recovery-Code: ${data.recoveryCode}`, 20, y);

    doc.save(fileName);
}