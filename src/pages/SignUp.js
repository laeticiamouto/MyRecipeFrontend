import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api';
import { AuthContext } from '../components/AuthContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormContainer = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ErrorText = styled.div`
  color: red;
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 0.875em;
`;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const navigate = useNavigate();
  const { setUserId } = useContext(AuthContext); // Access setUserId from AuthContext

  // Validation function for form fields
  const validate = () => {
    let formErrors = {};

    if (!username) {
      formErrors.username = "Le nom d'utilisateur est requis.";
    } else if (username.length < 2) {
      formErrors.username = "Le nom d'utilisateur doit contenir au moins 2 caractères.";
    } else if (!/^[a-zA-Z]+$/.test(username)) {
      formErrors.username = "Le nom d'utilisateur doit contenir uniquement des lettres.";
    }

    if (!password) {
      formErrors.password = 'Le mot de passe est requis.';
    } else if (password.length < 6) {
      formErrors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      formErrors.password = 'Le mot de passe doit contenir des lettres et des chiffres.';
    }

    setErrors(formErrors);

    return !formErrors.username && !formErrors.password;
  };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await signup(username, password);
      setUserId(response.data.userId); // Store userId in AuthContext upon successful signup
      toast.success('Inscription réussie !');
      navigate('/login');
    } catch (error) {
      toast.error("Échec de l'inscription.");
    }
  };

  return (
    <FormContainer className="mt-5">
      <h1 className="text-center">S'inscrire</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control mb-3"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom d'utilisateur"
          />
          {errors.username && <ErrorText>{errors.username}</ErrorText>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input
            type="password" // Change type to password for secure input
            className="form-control mb-3"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </div>
        <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
      </form>
    </FormContainer>
  );
};

export default SignUp;
