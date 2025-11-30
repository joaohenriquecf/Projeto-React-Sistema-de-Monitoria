// simples wrapper fetch usando baseURL = backend
export const API = "http://localhost:3001";

export async function get(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error("Erro ao buscar dados");
  return res.json();
}

export async function post(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Erro ao salvar");
  }
  // tenta devolver JSON, mas alguns endpoints só retornam mensagem
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return null;
}
