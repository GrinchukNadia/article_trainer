import CloseTrain from "../CloseTrain"

function ArticleSprint({close}: {close: ()=> void}) {
  return (
    <>
      <CloseTrain close={close} />
      <p>ArticleSprint</p>
    </>
  )
}

export default ArticleSprint
