import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../api';
import { AuthContext } from '../components/AuthContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const DetailContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authToken, userId } = useContext(AuthContext); // include userId

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await getRecipeById(authToken, id); // pass userId
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Erreur lors du chargement de la recette');
        setLoading(false);
      }
    };

    getRecipe();
  }, [id, authToken, userId]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!recipe) {
    return <div>Recette non trouvée</div>;
  }

  return (
    <DetailContainer>
      <h1 className="text-center pb-3">{recipe.name}</h1>
      <p><strong>Catégorie:</strong> {recipe.category}</p>
      <p><strong>Ingrédients:</strong></p>
      <ul>
        {recipe.ingredients.split('\n').map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p><strong>Instructions:</strong></p>
      <p>{recipe.instructions}</p>
      {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} style={{ maxWidth: '100%' }} />}
    </DetailContainer>
  );
};

export default RecipeDetail;
