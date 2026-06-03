import type { Status } from "./AuthModal";

type SafeCheckType = {
  setStatus: (value: Status) => void;
}

function SafeCheck({ setStatus }: SafeCheckType) {

  return (
    <div  style={{ display: "flex", flexDirection: "column"}}>
      <p style={{ color: "red",fontSize: "1.6rem", fontWeight: "light"}}>Nach dem Schließen können der Benutzername und der Wiederherstellungscode nicht erneut angezeigt werden.</p>

      <button   style={{border: "1px solid #bbbbbb80", cursor: "pointer", fontSize: "1.2rem", margin: "4px", padding: "6px", marginRight: "20px"}} onClick={() => setStatus("success")}>Ich habe den Code und den Benutzernamen gespeichert.</button>
      <button  style={{border: "1px solid #bbbbbb80", cursor: "pointer", fontSize: "1.2rem", margin: "4px", padding: "6px", marginRight: "20px"}} onClick={() => setStatus("code")}>Zurück</button>
    </div>
  );
}

export default SafeCheck;
