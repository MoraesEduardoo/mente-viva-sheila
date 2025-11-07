import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function getUsers() {
  try { return JSON.parse(localStorage.getItem('mv_users') || '[]'); } catch { return []; }
}
function setUsers(arr) {
  localStorage.setItem('mv_users', JSON.stringify(arr));
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  function handleSubmit(e) {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(u => u.email === email.trim().toLowerCase());
    if (!user || user.senha !== senha) {
      setErro('Credenciais inválidas. Verifique e tente novamente.');
      return;
    }
    login({ name: user.nome, email: user.email });
    navigate(from, { replace: true });
  }

  return (
    <div className="container">
      <section className="section card-lg" style={{ maxWidth: 520, margin: '40px auto' }}>
        <h1>Entrar</h1>
        <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
          <label className="label">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />

          <label className="label">Senha</label>
          <input className="input" value={senha} onChange={e=>setSenha(e.target.value)} type="password" required />

          {erro && <p style={{ color: '#b44545', marginTop: 6 }}>{erro}</p>}

          <div className="btn-row" style={{ marginTop: 14 }}>
            <button className="btn" type="submit">Acessar</button>
            <Link className="btn btn-ghost" to="/cadastro">Cadastrar</Link>
          </div>
        </form>
      </section>
    </div>
  );
}
