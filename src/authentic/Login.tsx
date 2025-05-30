import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }), // aceita email ou username
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const data = await response.json();

      // Salva token e usuário no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      
      setShowModal(true);
    } catch (err) {
      setError('Usuário/email ou senha incorretos.');
    }
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
            <Link to="/ForgotPassword" className="forgot-password-link">Esqueci minha senha</Link>
          </div>
          <p></p>
          <button className="button" type="submit">Sign in</button>
          <div className="register-text">
            Não tem conta? <Link to="/register" className="register-link">Registrar-me</Link>
          </div>
        </form>
      </div>

      {showModal && <Modal message="Login bem-sucedido!" onClose={handleModalClose} />}
    </div>
  );
};

export default Login;
