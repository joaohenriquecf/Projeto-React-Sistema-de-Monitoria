import { useEffect, useState } from "react";
import { get, post } from "../../services/api";
import "../../style/Disciplinas.css"

export default function Disciplinas() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");

  async function carregar() {
    try {
      const dados = await get("/disciplinas");
      setLista(dados);
    } catch {
      setLista([]);
    }
  }

  useEffect(() => { carregar(); }, []);

  async function salvar(e) {
    e.preventDefault();
    try {
      await post("/disciplinas", { nome, codigo });
      setNome(""); setCodigo("");
      carregar();
    } catch {
      alert("Erro ao cadastrar disciplina");
    }
  }

  return (
    <div className="page">
      <h1 className="tituloDisciplinas">Disciplinas</h1>

      <form onSubmit={salvar} className="form-inline">
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input placeholder="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
        <button className="btn">Salvar</button>
      </form>

      <table>
        <thead><tr><th>ID</th><th>Nome</th><th>Código</th></tr></thead>
        <tbody>
          {lista.map(d => (
            <tr key={d.id}><td>{d.id}</td><td>{d.nome}</td><td>{d.codigo}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
