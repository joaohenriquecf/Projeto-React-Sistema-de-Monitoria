import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSave } from "../../services/auth";
import { post } from "../../services/api";
import "../../style/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function entrar(e) {
    e.preventDefault();
    setLoading(true);

    // tenta autenticar via backend /login (se existir)
    try {
      // se seu backend não tem /login, o fetch vai falhar e teremos fallback
      const resp = await post("/login", { email, senha });
      // se backend retornar token ou usuário, você pode salvar (ajuste conforme retorno)
      if (resp && resp.token) {
        // opcional: salvar token se backend der
        localStorage.setItem("token", resp.token);
        loginSave(email);
      } else {
        // fallback simples: salvar email como usuário
        loginSave(email);
      }
      navigate("/");
    } catch (err) {
      // fallback simples: aceitar email mesmo sem backend de login
      loginSave(email);
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="pageLogin">
    <h1 className="tituloTopo">Monitoria UNIESP</h1>
    <img src="" alt="Logo" className="logo" />
    <form onSubmit={entrar} className="form">
      <h2>Login</h2>
      <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="Senha" required value={senha} onChange={(e) => setSenha(e.target.value)}/>
      <button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>

  </div>
  );
}
