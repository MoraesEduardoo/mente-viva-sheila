import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function getUsers() {
  try { return JSON.parse(localStorage.getItem('mv_users') || '[]'); } catch { return []; }
}
function setUsers(arr) {
  localStorage.setItem('mv_users', JSON.stringify(arr));
}

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirma, setConfirma] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (senha.length < 6) return setErro('A senha deve ter pelo menos 6 caracteres.');
    if (senha !== confirma) return setErro('As senhas não conferem.');
    const users = getUsers();
    if (users.some(u => u.email === email.trim().toLowerCase()))
      return setErro('Já existe uma conta com esse e-mail.');

    const novo = { nome: nome.trim(), email: email.trim().toLowerCase(), senha };
    users.push(novo);
    setUsers(users);

    // loga automaticamente
    login({ name: novo.nome, email: novo.email });
    navigate('/dashboard', { replace: true });
  }

  return (
    <div className="container">
      <section className="section card-lg" style={{ maxWidth: 520, margin: '40px auto' }}>
        <h1>Cadastrar</h1>
        <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
          <label className="label">Nome</label>
          <input className="input" value={nome} onChange={e=>setNome(e.target.value)} required />

          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />

          <label className="label">Senha</label>
          <input className="input" type="password" value={senha} onChange={e=>setSenha(e.target.value)} required />

          <label className="label">Confirmar senha</label>
          <input className="input" type="password" value={confirma} onChange={e=>setConfirma(e.target.value)} required />

          {erro && <p style={{ color: '#b44545', marginTop: 6 }}>{erro}</p>}

          <div className="btn-row" style={{ marginTop: 14 }}>
            <button className="btn" type="submit">Criar conta</button>
          </div>
        </form>
      </section>
    </div>
  );
}
