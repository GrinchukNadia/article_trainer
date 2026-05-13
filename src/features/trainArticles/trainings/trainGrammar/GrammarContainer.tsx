import CloseTrain from "../../shared/CloseTrain"

export default function GrammarContainer({close}:any) {
  return (
    <div
      style={{
        width: "80%",
        height: "100%",
        color: "white",
        textAlign: "center",
      }}
    >
      <CloseTrain close={close}/>
      <h3>
        🔧 Dieser Bereich befindet sich noch in Entwicklung.
      </h3>
      <p>In Zukunft wird hier neue Funktionalität hinzugefügt.</p>
    </div>
  );
}
