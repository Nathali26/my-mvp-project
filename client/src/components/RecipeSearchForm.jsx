import React, { useState } from "react";
import "./RecipeSearchForm.css"

export default function RecipeSearchForm({ onSearch }) {
  const [ingredients, setIngredients] = useState("");

  const handleChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(ingredients);
    setIngredients("");
  };

  return (
    <div className="cointainer">
      <div className="search-form">

      <h2>Search Recipes by Ingredients</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Ingredients: 
          <input
            type="text"
            value={ingredients}
            name="ingredient"
            placeholder="Ingredient,ingredient"
            onChange={handleChange}
            />
        </label>
        <br />
        <br />
        <button type="submit">Search </button>
      </form>
      </div>
    </div>
  );
}
