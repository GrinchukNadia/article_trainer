import CloseTrain from "../CloseTrain"

function TranslateMaster({close}: {close: ()=> void  }) {
  return (
    <div>
      <CloseTrain close={close} />
      TranslateMaster
    </div>
  )
}

export default TranslateMaster
