import EinEineTrainer from "../trainings/EinEineTrainer/EinEineTrainer";
import MistakeReview from "../trainings/MistakeReview/MistakeReview";
import PluralTrainer from "../trainings/PluralTrainer/PluralTrainer";
import GrammarContainer from "../trainings/trainGrammar/GrammarContainer";
import TranslateMaster from "../trainings/TranslateMaster/TranslateMaster";
import CardBody from "../trainings/wordCards/CardBody";

export const modalMap = {
  learnArticles:  (props: {close: ()=> void}) => <CardBody {...props}/>,
  einEineTrainer:  (props: {close: ()=> void}) => <EinEineTrainer {...props}/>,
  grammar:   (props: {close: ()=> void}) => <GrammarContainer {...props}/>,
  mistakeReview:      (props: {close: ()=> void}) => <MistakeReview {...props}/>,
  pluralTrainer: (props: {close: ()=> void}) => <PluralTrainer {...props}/>,
  translateMaster:      (props: {close: ()=> void}) => <TranslateMaster {...props}/>
} as const;

export type ModalKey = keyof typeof modalMap;
