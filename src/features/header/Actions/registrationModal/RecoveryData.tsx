import { downloadRecoveryPdf } from "./DownloadRecoveryPdf";
import { PixelIconDownload } from "../../../../assets/svg/PixelIconDownload";

type RecoveryDataType = {
  username:string,
  hash:string
}
function RecoveryData({ username, hash }:RecoveryDataType) {


  return (<>
    <div>
      <p style={{ color: "red" }}>
        Achtung: Dieser Code wird nur einmal angezeigt.
      </p>
      <p style={{ fontSize: "14px" }}>
        Speichern Sie diesen Code zusammen mit Ihrem Benutzernamen an
        einem sicheren Ort. Falls Sie Ihr Passwort vergessen, ist eine
        Wiederherstellung Ihres Kontos nur mit diesen beiden Angaben
        möglich. Andernfalls müssten Sie ein neues Konto erstellen und Ihr
        bisheriger Lernfortschritt würde verloren gehen.
      </p>

      {/* <p style={{ color: "red" }}>
        Внимание: этот код будет показан только один раз.
      </p>
      <p style={{ fontSize: "14px" }}>
        Запишите этот код вместе со своим именем пользователя в надежном
        месте. Восстановление аккаунта возможно будет
        только используя имя пользователя и код восстановления. Иначе придется создать новый
        аккаунт, и весь прогресс будет потерян.
      </p> */}
      <div
        style={{
          padding: "20px",
          border: "1px solid  #D3D3D3",
          backgroundColor: "#e9e9e9",
          textAlign: "center",
          fontSize: "20px",
          fontFamily: "sans-serif",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{

          textAlign: "left"
        }}>
          {`Username: ${username}`}<br />
          {`Hash code: ${hash}`}
        </div>
        <div>
          <div style={{ cursor: "pointer" }}
            onClick={() => downloadRecoveryPdf({ username: username, recoveryCode: hash })}
          >
            <div>скачать</div>
            <PixelIconDownload />
          </div>
        </div>

      </div>
    </div>
  </>
  )
}



export default RecoveryData;
