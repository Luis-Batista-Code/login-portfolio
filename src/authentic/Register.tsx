import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { getUsers, saveUser, userExists, User } from '../authentic/authStorage';
import Modal from '../components/Modal';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Por favor, insira um nome de usuário.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (userExists(username, email)) {
      setError('Usuário ou email já cadastrados.');
      return;
    }

    saveUser({ username, email, password });
    setModalMessage('Registro realizado com sucesso!');
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">Registrar</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit} noValidate>
          <input
            className="input"
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
          <button className="button" type="submit">Registrar</button>
        </form>
        <div style={{ marginTop: '15px' }}>
          <a href="/" className="forgot-password-link">
            Voltar para login
          </a>
        </div>
      </div>
      {showModal && <Modal message={modalMessage} onClose={handleModalClose} />}
    </div>
  );
};

export default Register;
