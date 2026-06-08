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
      <FeedCatContent frame={frame} setFrame={setFrame} close={close}/>
  );

}
export default AnotherGame;
