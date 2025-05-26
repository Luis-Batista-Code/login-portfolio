import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { User } from './authStorage';

const DashboardWrapper = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  if (!user) {
    return <p>Carregando informações do usuário...</p>;
  }

  return <Dashboard user={user} />;
};

export default DashboardWrapper;
