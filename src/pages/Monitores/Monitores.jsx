import { useEffect, useState } from "react";
import { get, post } from "../../services/api";
import "../../style/Monitores.css"

export default function Monitores() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function carregar() {
    try {
      const dados = await get("/monitores");
      setLista(dados);
    } catch (e) {
      console.error(e);
      setLista([]);
    }
  }

  useEffect(() => { carregar(); }, []);

  async function salvar(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await post("/monitores", { nome, curso, email });
      setNome(""); setCurso(""); setEmail("");
      await carregar();
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar monitor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1 className="tituloMonitores">Monitores</h1>
      <form onSubmit={salvar} className="form-inline">
        <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input placeholder="Curso" value={curso} onChange={(e) => setCurso(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button className="btn" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</button>
      </form>

      <table>
        <thead>
          <tr><th>ID</th><th>Nome</th><th>Curso</th><th>Email</th></tr>
        </thead>
        <tbody>
          {lista.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.nome}</td>
              <td>{m.curso}</td>
              <td>{m.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
