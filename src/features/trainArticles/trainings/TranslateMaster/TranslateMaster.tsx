import CloseTrain from "../../../trainArticles/shared/CloseTrain"

function TranslateMaster({close}: {close: ()=> void  }) {
  return (
    <>
      <CloseTrain close={close} />
      <p>TranslateMaster</p>
    </>
  )
}

export default TranslateMaster
