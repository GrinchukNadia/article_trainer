import CardBody from "../../wordCards/CardBody";
import EinEineTrainer from "./EinEineTrainer";
import ArticleSprint from "./ArticleSprint";
import MistakeReview from "./MistakeReview";
import PluralTrainer from "./PluralTrainer";
import TranslateMaster from "./TranslateMaster";

export const modalMap = {
  flashcards:  (props: {close: ()=> void}) => <CardBody {...props}/>,
  brainstorm:  (props: {close: ()=> void}) => <EinEineTrainer {...props}/>,
  translate:   (props: {close: ()=> void}) => <ArticleSprint {...props}/>,
  repeat:      (props: {close: ()=> void}) => <MistakeReview {...props}/>,
  constructor: (props: {close: ()=> void}) => <PluralTrainer {...props}/>,
  sprint:      (props: {close: ()=> void}) => <TranslateMaster {...props}/>
} as const;

export type ModalKey = keyof typeof modalMap;
