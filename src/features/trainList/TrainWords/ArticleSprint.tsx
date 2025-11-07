import CloseTrain from "./CloseTrain"

function ArticleSprint({close}: {close: ()=> void}) {
  return (
    <div>
      <CloseTrain close={close} />
      ArticleSprint
    </div>
  )
}

export default ArticleSprint
