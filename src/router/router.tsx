import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../features/AppLayout";
import Train from "../features/trainList/Train";
import Mistakes from "../features/mistakesList/Mistakes";
import Stats from "../features/statistik/Stats";
import Impressum from "../features/impresum/Impressum";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "impressum", element: <Impressum /> },
      { path: "train", element: <Train /> },
      { path: "mistakes", element: <Mistakes /> },
      { path: "stats", element: <Stats /> },
    ],
  },
]);
