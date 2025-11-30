import { useEffect, useState } from "react";
import { get, post } from "../../services/api";
import "../../style/Materiais.css"

export default function Materiais() {
  const [lista, setLista] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [link, setLink] = useState("");
  const [descricao, setDescricao] = useState("");

  async function carregar() {
    try {
      const dados = await get("/materiais");
      setLista(dados);
    } catch {
      setLista([]);
    }
  }

  useEffect(() => { carregar(); }, []);

  async function salvar(e) {
    e.preventDefault();
    try {
      await post("/materiais", { titulo, link, descricao });
      setTitulo(""); setLink(""); setDescricao("");
      carregar();
    } catch {
      alert("Erro ao cadastrar material");
    }
  }

  return (
    <div className="page">
      <h1 className="tituloMateriais">Materiais</h1>

      <form onSubmit={salvar} className="form-inline">
        <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} required />
        <input placeholder="Link" value={link} onChange={e => setLink(e.target.value)} required />
        <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required />
        <button className="btn">Salvar</button>
      </form>

      <table>
        <thead><tr><th>ID</th><th>Título</th><th>Link</th><th>Descrição</th></tr></thead>
        <tbody>
          {lista.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.titulo}</td>
              <td><a href={m.link} target="_blank" rel="noreferrer">Abrir</a></td>
              <td>{m.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
