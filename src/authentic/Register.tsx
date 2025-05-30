import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Erro no registro');
        return;
      }

      setModalMessage('Registro realizado com sucesso!');
      setShowModal(true);
    } catch (err) {
      setError('Erro ao conectar com o servidor.');
    }
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
        <Link to="/" className="forgot-password-link">
  Voltar para login
</Link>
        </div>
      </div>
      {showModal && <Modal message={modalMessage} onClose={handleModalClose} />}
    </div>
  );
};

export default Register;
