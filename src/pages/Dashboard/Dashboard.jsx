import { useEffect, useState } from "react";
import "../../style/Dashboard.css"

export default function Dashboard() {
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    setUsuario(localStorage.getItem("usuario") || "");
  }, []);

  return (
    <div className="page">
      <h1 className="tituloDashboard">Dashboard</h1>
      <p>Bem-vindo(a), <strong>{usuario}</strong></p>
    </div>
  );
}
