import ArticleSprint from "../trainings/ArticleSprint/ArticleSprint";
import EinEineTrainer from "../trainings/EinEineTrainer/EinEineTrainer";
import MistakeReview from "../trainings/MistakeReview/MistakeReview";
import PluralTrainer from "../trainings/PluralTrainer/PluralTrainer";
import TranslateMaster from "../trainings/TranslateMaster/TranslateMaster";
import CardBody from "../trainings/wordCards/CardBody";

export const modalMap = {
  learnArticles:  (props: {close: ()=> void}) => <CardBody {...props}/>,
  einEineTrainer:  (props: {close: ()=> void}) => <EinEineTrainer {...props}/>,
  articleSprint:   (props: {close: ()=> void}) => <ArticleSprint {...props}/>,
  mistakeReview:      (props: {close: ()=> void}) => <MistakeReview {...props}/>,
  pluralTrainer: (props: {close: ()=> void}) => <PluralTrainer {...props}/>,
  translateMaster:      (props: {close: ()=> void}) => <TranslateMaster {...props}/>
} as const;

export type ModalKey = keyof typeof modalMap;
