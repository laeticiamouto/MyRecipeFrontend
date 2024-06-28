import React, { useState, useEffect, useContext } from 'react';
import { getRecipes } from '../api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../components/AuthContext'; // Importez le contexte d'authentification

const ListContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const RecipeCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authToken } = useContext(AuthContext); // Récupérez le token à partir du contexte d'authentification

  useEffect(() => {
    const getRecipesAll = async () => {
      try {
        const response = await getRecipes(authToken); // Envoyez le token avec la requête API
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Erreur lors du chargement des recettes');
        setLoading(false);
      }
    };

    getRecipesAll();
  }, [authToken]); // Assurez-vous que useEffect se déclenche à chaque changement du token

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <ListContainer>
      <h1 className="text-center pb-3">Liste des Recettes</h1>
      {recipes.length === 0 ? (
        <p>Aucune recette trouvée</p>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.category}</p>
            <Link to={`/recipes/${recipe.id}`} className="btn btn-primary">
              Voir la recette
            </Link>
          </RecipeCard>
        ))
      )}
    </ListContainer>
  );
};

export default RecipeList;
