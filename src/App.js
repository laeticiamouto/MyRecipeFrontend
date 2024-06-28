import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './components/AuthContext'; // Utilisation de l'import sans les accolades pour AuthProvider
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RecipeList from './pages/RecipeList';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import { ToastContainer } from 'react-toastify';
import RecipeDetail from './pages/RecipeDetail';

function App() {
  return (
    <AuthProvider> {/* Envelopper toute l'application avec AuthProvider */}
      <Router>
        <Navbar /> {/* Navbar doit être en dehors de la Route principale */}
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/edit-recipe" element={<EditRecipe />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;
