import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { updateRecipe } from '../api';
import { AuthContext } from '../components/AuthContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';

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

const EditRecipe = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categorie, setCategorie] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({});

  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

    // gestion des erreurs du formulaire
    const validate = () => {
      let formErrors = {};
  
      if (!name) formErrors.name = 'Le nom de la recette est requis.';
      if (!ingredients) formErrors.ingredients = 'Les ingrédients sont requis.';
      if (!instructions) formErrors.instructions = 'Les instructions sont requises.';
      if (!categorie) formErrors.categorie = 'La catégorie est requise.';
      if (!imageUrl) formErrors.imageUrl = 'L\'URL de l\'image est requise.';
  
      setErrors(formErrors);
  
      return !formErrors.name && !formErrors.ingredients && formErrors.instructions && formErrors.categorie && formErrors.imageUrl;
  
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
  
      if (!validate()) {
        return;
      }
  
      try {
        const response = await updateRecipe(authToken, { name, ingredients, instructions, categorie, imageUrl });
        if (response.status === 201) { // Assuming 201 Created is the success status
            toast.success('Recette modifié avec succès!');
            setName('');
            navigate('/recipes'); // Redirection vers la liste des tâches après ajout
        } else {
            toast.error('Modification de recette impossible!');
        }
      } catch (error) {
          toast.error('Modification de recette impossible!');
      }
  
      console.log('Recette modifié avec succès!', { name, ingredients, instructions, categorie, imageUrl });
    
    }

  return (
    <FormContainer className="mt-5 mb-5">
    <h1 className="text-center pb-3">Modifier une Recette</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nom recette</label>
        <input
          type="text"
          className="form-control mb-3"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <ErrorText>{errors.name}</ErrorText>}
      </div>
      <div className="mb-3">
      <label htmlFor="ingredients" className="form-label">Ingredients</label>
      <textarea
        className="form-control mb-3"
        id="ingredients"
        rows="3" 
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
        {errors.ingredients && <ErrorText>{errors.ingredients}</ErrorText>}
      </div>
      <div className="mb-3">
      <label htmlFor="instructions" className="form-label">Instructions</label>
      <textarea
        className="form-control mb-3"
        id="instructions"
        rows="3"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
        {errors.instructions && <ErrorText>{errors.instructions}</ErrorText>}
      </div>
      <div className="mb-3">
        <label htmlFor="categorie" className="form-label">Catégorie</label>
        <select
          className="form-control mb-3"
          id="categorie"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        >
          <option value="">Sélectionnez une catégorie</option>
          <option value="méditérannéen">Méditérannéen</option>
          <option value="créole">Créole</option>
          <option value="française">Française</option>
          <option value="indienne">Indienne</option>
        </select>
        {errors.categorie && <ErrorText>{errors.categorie}</ErrorText>}
      </div>
      <div className="mb-3">
        <label htmlFor="imageUrl" className="form-label">Image url</label>
        <input
          type="text"
          className="form-control mb-3"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {errors.imageUrl && <ErrorText>{errors.imageUrl}</ErrorText>}
      </div>
      <button type="submit" className="btn btn-primary w-100">Modifier recette</button>
    </form>
  </FormContainer>
  )
}

export default EditRecipe