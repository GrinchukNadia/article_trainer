import CloseTrain from "../../shared/CloseTrain"
import EinEineCard from "./EinEineCard"

function EinEineTrainer({close}: {close: () => void}) {
  return <>
      <CloseTrain close={close} />
      <EinEineCard />
    </>
  
}

export default EinEineTrainer
