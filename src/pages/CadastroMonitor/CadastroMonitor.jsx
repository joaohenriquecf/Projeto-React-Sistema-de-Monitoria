import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CadastroMonitor() {
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  async function salvar(e) {
    e.preventDefault();

    await api.post("/monitores", { nome, curso, email });

    alert("Monitor cadastrado!");
    navigate("/monitores");
  }

  return (
    <div className="page">
      <h1>Cadastrar Monitor</h1>

      <form onSubmit={salvar} className="form">
        <input type="text" placeholder="Nome" required value={nome} onChange={(e) => setNome(e.target.value)} />

        <input type="text" placeholder="Curso" required value={curso} onChange={(e) => setCurso(e.target.value)} />

        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />

        <button className="btn">Cadastrar</button>
      </form>
    </div>
  );
}
