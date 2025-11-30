import { useEffect, useState } from "react";
import { get, post } from "../../services/api";
import "../../style/Duvidas.css"

export default function Duvidas() {
  const [lista, setLista] = useState([]);
  const [aluno, setAluno] = useState("");
  const [pergunta, setPergunta] = useState("");

  async function carregar() {
    try {
      const dados = await get("/duvidas");
      setLista(dados);
    } catch {
      setLista([]);
    }
  }

  useEffect(() => { carregar(); }, []);

  async function salvar(e) {
    e.preventDefault();
    try {
      await post("/duvidas", { aluno, pergunta });
      setAluno(""); setPergunta("");
      carregar();
    } catch {
      alert("Erro ao enviar dúvida");
    }
  }

  return (
    <div className="page">
      <h1 className="tituloDuvidas">Dúvidas</h1>

      <form onSubmit={salvar} className="form-inline">
        <input placeholder="Seu nome" value={aluno} onChange={e => setAluno(e.target.value)} required />
        <input placeholder="Sua dúvida" value={pergunta} onChange={e => setPergunta(e.target.value)} required />
        <button className="btn">Enviar</button>
      </form>

      <table>
        <thead><tr><th>ID</th><th>Aluno</th><th>Pergunta</th><th>Status</th></tr></thead>
        <tbody>
          {lista.map(d => (
            <tr key={d.id}><td>{d.id}</td><td>{d.aluno}</td><td>{d.pergunta}</td><td>{d.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
