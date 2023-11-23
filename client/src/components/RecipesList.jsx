import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecipesList.css"

export default function RecipesList({ recipes }) {
  const navigate = useNavigate();

  const handleRecipeClick = (recipeId, recipeTitle) => {
    navigate(`/recipe/${recipeId}`, { state: { title: recipeTitle } });
  };

   return (
     <div className="recipe-list">
       <h2>Recipes List</h2>
       {recipes.map((recipe) => (
         <div
           key={recipe.id}
           onClick={() => handleRecipeClick(recipe.id, recipe.title)}
           className="RecipeCard"
         >
           <h3 className="Title">{recipe.title || "Recipe Title"}</h3>
         </div>
       ))}
     </div>
   );

};
