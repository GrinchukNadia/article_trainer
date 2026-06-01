import type { Status } from "./AuthModal";

type SafeCheckType = {
  setStatus: (value: Status) => void;
}

function SafeCheck({ setStatus }: SafeCheckType) {

  return (
    <div  style={{ backgroundColor: "#fd552b",}}>
      <p style={{ fontSize: "1.6rem", fontWeight: "light"}}>Nach dem Schließen können der Benutzername und der Wiederherstellungscode nicht erneut angezeigt werden.</p>

      <button  style={{border: "none", fontSize: "2rem", padding: "6px 16px", marginRight: "20px"}} onClick={() => setStatus("code")}>Zurück</button>
      <button   style={{border: "none", fontSize: "2rem", padding: "6px 16px", marginRight: "20px"}} onClick={() => setStatus("success")}>Ich habe den Code und den Benutzernamen gespeichert.</button>
    </div>
  );
}

export default SafeCheck;
