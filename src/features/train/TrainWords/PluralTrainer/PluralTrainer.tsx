import CloseTrain from "../CloseTrain"

function PluralTrainer({close}: {close: ()=> void}) {
  return (
    <div>
      <CloseTrain close={close} />
      PluralTrainer
    </div>
  )
}

export default PluralTrainer
