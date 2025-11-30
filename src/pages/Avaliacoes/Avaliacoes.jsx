import { useEffect, useState } from "react";
import { get, post } from "../../services/api";
import "../../style/Avaliacoes.css"

export default function Avaliacoes() {
  const [lista, setLista] = useState([]);
  const [monitor, setMonitor] = useState("");
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState("");

  async function carregar() {
    try {
      const dados = await get("/avaliacoes");
      setLista(dados);
    } catch {
      setLista([]);
    }
  }

  useEffect(() => { carregar(); }, []);

  async function salvar(e) {
    e.preventDefault();
    try {
      await post("/avaliacoes", { monitor, comentario, nota });
      setMonitor(""); setComentario(""); setNota("");
      carregar();
    } catch {
      alert("Erro ao cadastrar avaliação");
    }
  }

  return (
    <div className="page">
      <h1 className="tituloAvaliacoes">Avaliações</h1>

      <form onSubmit={salvar} className="form-inline">
        <input placeholder="Nome do Monitor" value={monitor} onChange={e => setMonitor(e.target.value)} required />
        <input placeholder="Comentário" value={comentario} onChange={e => setComentario(e.target.value)} required />
        <input type="number" placeholder="Nota (0-10)" value={nota} onChange={e => setNota(e.target.value)} required />
        <button className="btn">Salvar</button>
      </form>

      <table>
        <thead><tr><th>ID</th><th>Monitor</th><th>Comentário</th><th>Nota</th></tr></thead>
        <tbody>
          {lista.map(a => (
            <tr key={a.id}><td>{a.id}</td><td>{a.monitor}</td><td>{a.comentario}</td><td>{a.nota}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
