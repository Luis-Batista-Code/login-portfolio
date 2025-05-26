import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { getUsers, User } from '../authentic/authStorage';
import Modal from '../components/Modal';

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = getUsers();
    const userFound = users.find(
      (user: User) =>
        (user.email === identifier || user.username === identifier) &&
        user.password === password
    );

    if (!userFound) {
      setError('Usuário/email ou senha incorretos.');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(userFound));
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">Sign in</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit} noValidate>
          <input
            className="input"
            type="text"
            placeholder="Email ou nome de usuário"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div className="forgot-password-text" style={{ marginTop: '10px' }}>
            <a href="/ForgotPassword" className="forgot-password-link">Esqueci minha senha</a>
          </div>
<p></p>
          <button className="button" type="submit">Sign in</button>
          <div className="register-text">
            Não tem conta? <a href="/register" className="register-link">Registrar-me</a>
          </div>
        </form>
      </div>

      {showModal && <Modal message="Login bem-sucedido!" onClose={handleModalClose} />}
    </div>
  );
};

export default Login;
