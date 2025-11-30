import { Link } from "react-router-dom";
import { logout } from "../services/auth";
import "../style/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Sistema Monitoria</div>
      <div className="links">
        <Link to="/">Dashboard</Link>
        <Link to="/monitores">Monitores</Link>
        <Link to="/disciplinas">Disciplinas</Link>
        <Link to="/materiais">Materiais</Link>
        <Link to="/duvidas">Dúvidas</Link>
        <Link to="/avaliacoes">Avaliações</Link>
        <button className="logout" onClick={logout}>Sair</button>
      </div>
    </nav>
  );
}
