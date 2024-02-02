import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Settings from "./pages/Settings";
import "./sass/index.scss";
import Home from "./pages/Home";
import Response from "./pages/Response";
import "./components/Inscription";
import EntretienEtReparation from "./pages/EntretienEtReparation";
import LesMotos from "./pages/LesMotos";
import App from "./App";
import Balade from "./pages/Balade";
import { ResponseProvider } from "./contexts/MessageContext";
import CreateTopic from "./pages/CreateTopic";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Inscription",
    element: <App />,
  },
  {
    path: "/Connection",
    element: <App />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Settings",
    element: <Settings />,
  },
  {
    path: "/Balade-et-rencontre",
    element: <Balade />,
  },
  {
    path: "/Les-Motos",
    element: <LesMotos />,
  },
  {
    path: "/Entretien-et-réparation",
    element: <EntretienEtReparation />,
  },
  {
    path: "/reponse",
    element: <Response />,
  },
  {
    path: "/Reponse/:id",
    element: <Response />,
  },
  {
    path: "/Crée-un-topic",
    element: <CreateTopic />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ResponseProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ResponseProvider>
  </React.StrictMode>
);
