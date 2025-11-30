// login muito simples: guarda `usuario` no localStorage
export function loginSave(usuario) {
  localStorage.setItem("usuario", usuario);
}

export function logout() {
  localStorage.removeItem("usuario");
  // volta para login
  window.location.href = "/login";
}

export function isAuthenticated() {
  return !!localStorage.getItem("usuario");
}
