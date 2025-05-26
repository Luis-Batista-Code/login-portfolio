import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import Modal from '../components/Modal';

const ForgotPassword: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (identifier.trim() === '') {
      setError('Por favor, insira seu email ou nome de usuário.');
      return;
    }

    // Aqui você pode adicionar a lógica para realmente localizar a conta
    // Por enquanto, só mostra o modal
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/'); // Volta para login quando modal fechar
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">Recuperar senha</h2>
        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <label className="label" style={{ marginBottom: '8px' }}>
            Insira seu email ou nome de usuário para localizar sua conta:
          </label>
          <p></p>
          <input
            className="input"
            type="text"
            placeholder="Email ou nome de usuário"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            autoComplete="username"
          />
          <button className="button" type="submit" style={{ marginTop: '12px' }}>
            Enviar
          </button>
        </form>

        <div style={{ marginTop: '15px' }}>
          <Link to="/" className="forgot-password-link">
            Voltar para login
          </Link>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>Se a conta existir, você receberá um email com as instruções para recuperação.</p>
            <button className="button" onClick={closeModal}>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
