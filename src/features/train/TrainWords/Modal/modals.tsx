import ArticleSprint from "../ArticleSprint/ArticleSprint";
import EinEineTrainer from "../EinEineTrainer/EinEineTrainer";
import MistakeReview from "../MistakeReview/MistakeReview";
import PluralTrainer from "../PluralTrainer/PluralTrainer";
import TranslateMaster from "../TranslateMaster/TranslateMaster";
import CardBody from "../wordCards/CardBody";

export const modalMap = {
  learnArticles:  (props: {close: ()=> void}) => <CardBody {...props}/>,
  einEineTrainer:  (props: {close: ()=> void}) => <EinEineTrainer {...props}/>,
  articleSprint:   (props: {close: ()=> void}) => <ArticleSprint {...props}/>,
  mistakeReview:      (props: {close: ()=> void}) => <MistakeReview {...props}/>,
  pluralTrainer: (props: {close: ()=> void}) => <PluralTrainer {...props}/>,
  translateMaster:      (props: {close: ()=> void}) => <TranslateMaster {...props}/>
} as const;

export type ModalKey = keyof typeof modalMap;
