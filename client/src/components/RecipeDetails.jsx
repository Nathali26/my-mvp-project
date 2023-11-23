import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const RecipeDetails = () => {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const { id: recipeId } = useParams();
  const location = useLocation();
  const recipeTitle = location.state?.title || "Recipe";



  useEffect(() => {
     if (recipeId) {
      getRecipeDetails(recipeId);
    } else {
      console.log("No recipe ID provided");
    }
  }, [recipeId]);

    
    async function getRecipeDetails(recipeId) {
        const apiKey = "d7a6bf2ddeba4ff6a6c3a71150c199d6";
    
        try {
            let response = await fetch(
                `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`);
                
            if (response.ok) {
                let data = await response.json();
                setRecipeDetails(data); // Actualiza el estado con los detalles de la receta
            } else {
                console.error(`Server Error: ${response.status} ${response.statusText}`);
            }
        } catch (err) {
            console.error(`Network Error: ${err.message}`);
        }
    }


  if (!recipeDetails) return <div className="recipe-details-container">Loading...</div>;

  return (
    <div className="recipe-details-container">
      {recipeDetails && recipeDetails.length > 0 ? (
        <div>
          <h1>{recipeTitle}</h1>
          <h2>Recipe Instructions</h2>
          {recipeDetails[0].steps.map((step, index) => (
            <p key={index}>{step.step}</p>
          ))}
        </div>
      ) : (
        <div>Loading recipe details...</div>
      )}
    </div>
  );
};
    

export default RecipeDetails;
