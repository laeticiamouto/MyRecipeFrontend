import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Récupération de l'authToken et userId depuis localStorage lors du chargement initial de l'application
    const storedToken = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken) {
      setAuthToken(storedToken);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const login = (token, id) => {
    setAuthToken(token);
    setUserId(id);
    localStorage.setItem('authToken', token); // Stockage dans localStorage
    localStorage.setItem('userId', id); // Stockage dans localStorage
  };

  const logout = () => {
    setAuthToken(null);
    setUserId(null);
    localStorage.removeItem('authToken'); // Suppression depuis localStorage
    localStorage.removeItem('userId'); // Suppression depuis localStorage
  };

  return (
    <AuthContext.Provider value={{ authToken, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
