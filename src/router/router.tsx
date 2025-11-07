import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../features/AppLayout";
import Train from "../features/trainList/Train";
import Mistakes from "../features/mistakesList/Mistakes";
import Stats from "../features/statistik/Stats";
import Impressum from "../features/impresum/Impressum";
import TrainWords from "../features/trainList/TrainWords/TrainWords";
import TrainGrammar from "../features/trainList/TrainGrammar/TrainGrammar";
import CardBody from "../features/wordCards/CardBody";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "train", 
        element: <Train />,
        children:[
          { 
            path: "train_words",
            element: <TrainWords />,
            children: [
              {
                path: "articles_main",
                element: <CardBody />
              }
            ]
          },
          { 
            path: "train_grammar",
            element: <TrainGrammar />
          }
        ] 
      },
      { path: "impressum", element: <Impressum /> },
      { path: "mistakes", element: <Mistakes /> },
      { path: "stats", element: <Stats /> },
    ],
  },
]);
