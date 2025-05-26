import React from 'react';

export interface DashboardProps {
  user: {
    username: string;
    email: string;
    password: string;
    githubUrl?: string;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">Bem-vindo, {user.username}</h2>
        <p>Email: {user.email}</p>
        <p>Senha: {user.password}</p>

        {user.githubUrl && (
          <div style={{ marginTop: '20px' }}>
            <img
              src={user.githubUrl}
              alt="Foto do GitHub"
              style={{ width: 100, borderRadius: '50%' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
