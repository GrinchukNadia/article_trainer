import ArticleSprint from "../ArticleSprint/ArticleSprint";
import EinEineTrainer from "../EinEineTrainer/EinEineTrainer";
import MistakeReview from "../MistakeReview/MistakeReview";
import PluralTrainer from "../PluralTrainer/PluralTrainer";
import TranslateMaster from "../TranslateMaster/TranslateMaster";
import CardBody from "../wordCards/CardBody";


export const modalMap = {
  flashcards:  (props: {close: ()=> void}) => <CardBody {...props}/>,
  brainstorm:  (props: {close: ()=> void}) => <EinEineTrainer {...props}/>,
  translate:   (props: {close: ()=> void}) => <ArticleSprint {...props}/>,
  repeat:      (props: {close: ()=> void}) => <MistakeReview {...props}/>,
  constructor: (props: {close: ()=> void}) => <PluralTrainer {...props}/>,
  sprint:      (props: {close: ()=> void}) => <TranslateMaster {...props}/>
} as const;

export type ModalKey = keyof typeof modalMap;
