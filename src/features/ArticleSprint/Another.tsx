import { useEffect } from "react";
import { useState } from "react";
import { FeedCatContent } from "./FeedCatContent";

import {
    DndContext,
} from "@dnd-kit/core";


function AnotherGame({ close }: any) {
   const [phase] = useState("idle");
    const [frame, setFrame] = useState(6);
 

  useEffect(() => {
    if (phase !== "idle") return;
  }, [phase]);


  
  return (
    <DndContext
    onDragStart={() => setFrame(2)}
      onDragEnd={(event) => {
        const { active, over } = event;

        console.log("тащили:", active.id);
        console.log("бросили на:", over?.id);

        if (over?.id === "cat") {
          console.log("дали рыбку котику");
        }
        setFrame(0)
      }}
    >
      <FeedCatContent frame={frame} setFrame={setFrame} close={close}/>
    </DndContext>
  );

}
export default AnotherGame;
