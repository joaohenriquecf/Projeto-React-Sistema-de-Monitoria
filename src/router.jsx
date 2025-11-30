import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Monitores from "./pages/Monitores/Monitores";
import Disciplinas from "./pages/Disciplinas/Disciplinas";
import Materiais from "./pages/Materiais/Materiais";
import Duvidas from "./pages/Duvidas/Duvidas";
import Avaliacoes from "./pages/Avaliacoes/Avaliacoes";

import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/monitores", element: <Monitores /> },
      { path: "/disciplinas", element: <Disciplinas /> },
      { path: "/materiais", element: <Materiais /> },
      { path: "/duvidas", element: <Duvidas /> },
      { path: "/avaliacoes", element: <Avaliacoes /> }
    ]
  }
]);
