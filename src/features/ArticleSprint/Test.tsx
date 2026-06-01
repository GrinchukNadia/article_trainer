import { useRef, useState, type PointerEvent, type RefObject } from "react";
import styles from "./Test.module.scss";

function Test() {

  const [dragging, setDragging] = useState<any>(null);
  const [position, setPosition] = useState<any>([
    { id: 1, x: null, y: null },
    { id: 2, x: null, y: null },
    { id: 3, x: null, y: null },
    { id: 4, x: null, y: null },
    { id: 5, x: null, y: null },
    { id: 6, x: null, y: null },
    { id: 7, x: null, y: null },
    { id: 8, x: null, y: null },
    { id: 9, x: null, y: null },
    { id: 10, x: null, y: null },
    { id: 11, x: null, y: null },
    { id: 12, x: null, y: null },
    { id: 13, x: null, y: null },
    { id: 14, x: null, y: null },
    { id: 15, x: null, y: null },
  ]);
  const [isOver, setIsOver] = useState(false);
  const square = useRef<any>(null);

  function startDrag(id: any, e: React.PointerEvent) {

    //что бы правильно обрабатывался граб
    e.currentTarget.setPointerCapture(e.pointerId);

    const rect = e.currentTarget.getBoundingClientRect();

    setDragging({
      id: id,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    })

    setPosition((prev: any) =>
      prev.map((pos: any) =>
        pos.id === id ? { ...pos, x: rect.left, y: rect.top } : pos))
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return;

    const isOverTarget = aboveTarget(square, e);

    const idToRemove = dragging.id
    setPosition((prev: any) =>
      prev.map((pos: any) =>
        pos.id === idToRemove ?
          {
            ...pos,
            x: e.clientX - dragging.offsetX,
            y: e.clientY - dragging.offsetY,
          }
          :
          pos
      )
    )


    if (isOverTarget) {
      setIsOver(true);
    } else setIsOver(false)

    // setPosition({
    //   x: e.clientX - dragging.offsetX,
    //   y: e.clientY - dragging.offsetY,
    // })
  }

  function stopDrag(e: any) {
    const idToRemove = dragging.id;
    const isOverTarget = aboveTarget(square, e);
    if (isOverTarget) {
      setPosition((prev: any) => prev.filter((pos: any) => pos.id !== idToRemove))
    }
    setDragging(null);
    setIsOver(false);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerUp={stopDrag}
      style={{
        border: "2px solid",
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden"
      }}>
      <div
        style={{
          // display: "flex",
          width: "100%",
          height: "200px",
          // overflow: "hidden",
          // justifyContent: "space-around",
          // alignItems: "center",
          border: "2px solid blue"
        }}
      >

        <div className={styles.loop}>

        {
          position.map((pos: any) => (
            <div
              key={pos.id}
              onPointerDown={(e) => startDrag(pos.id, e)}
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: pos.id === dragging?.id && isOver ? "black" : "red",
                transform: pos.id === dragging?.id && isOver ? "scale(0)" : "scale(1)",
                cursor: dragging ? "grabbing" : "grab",
                transition: pos.id === dragging?.id ? "transform 0.2s" : "left 0.3s, top 0.3s",
                // transition: "transform linear 0.5s",
                position: pos.id === dragging?.id ? "fixed" : "static",
                left: pos.id === dragging?.id ? pos.x : undefined,
                top: pos.id === dragging?.id ? pos.y : undefined,
                display: "inline-flex"
              }}> {pos.id}
            </div>
          ))
        }

         </div>


      </div>


      <div
        ref={square}
        style={{
          width: " 100px",
          height: "100px",
          border: "2px solid red",
          position: "absolute",
          right: "50%",
          top: " 40%"
        }}></div>
    </div>

  );

}
export default Test;
function aboveTarget(square: RefObject<any>, e: PointerEvent<Element>) {
  const rect = square.current.getBoundingClientRect();

  const isOverTarget = e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom;
  return isOverTarget;
}

