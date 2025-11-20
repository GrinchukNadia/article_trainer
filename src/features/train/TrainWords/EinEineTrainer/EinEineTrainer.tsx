import CloseTrain from "./../CloseTrain"

function EinEineTrainer({close}: {close: () => void}) {
  return <>
      <CloseTrain close={close} />
      <p> EinEineTrainer</p>
     
    </>
  
}

export default EinEineTrainer
