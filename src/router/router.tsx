import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../features/AppLayout";
import Stats from "../features/statistik/Stats";
import Impressum from "../features/header/Actions/impressum/Impressum";
import TrainGrammar from "../features/TrainGrammar/TrainGrammar";
import Train from "../features/train/TrainList/Train";
// import CardBody from "../features/train/TrainWords/wordCards/CardBody";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <Train /> },
        { path: "grammar", element: <TrainGrammar /> },
        { path: "stats", element: <Stats /> },
        { path: "impressum", element: <Impressum /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
