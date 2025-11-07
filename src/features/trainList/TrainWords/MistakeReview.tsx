import CloseTrain from "./CloseTrain"

function MistakeReview({close}: {close: () => void }) {
  return (
    <div>
      <CloseTrain close={close} />
      MistakeReview
    </div>
  )
}

export default MistakeReview
