import CloseTrain from "./CloseTrain"

function EinEineTrainer({close}: {close: () => void}) {
  return <>
      <CloseTrain close={close} />
      <div> EinEineTrainer</div>
     
    </>
  
}

export default EinEineTrainer
