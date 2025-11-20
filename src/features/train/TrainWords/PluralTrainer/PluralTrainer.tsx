import CloseTrain from "../CloseTrain"

function PluralTrainer({close}: {close: ()=> void}) {
  return (
    <>
      <CloseTrain close={close} />
      <p>PluralTrainer</p>
    </>
  )
}

export default PluralTrainer
