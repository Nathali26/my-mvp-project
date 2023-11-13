// Este componente manejara la logica y la presentacion de la busqueda de recetas
import React from "react";
import { useState } from "react";

export default function RecipeSearchForm(props) {
    const [ingredients, setIngredients] = useState("");

    const handleChange = (event) => {
        setIngredients(event.target.value);    
    };

    const handleSubmit = event => {
    event.preventDefault();
    props.onSearch(ingredients);
    setIngredients("");
  };
  return (
    <div>
      <h2>Search Recipes by Ingredients</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Ingredients :
          <input
            type="text"
            value={ingredients}
            name="ingredient"
            placeholder="Ingredient,ingredient"
            onChange={handleChange}
          ></input>
        </label>
        <br />
        <br />
        <button type="submit">Search</button>
        {/* <button
          onClick={() => {
            props.onSearch(ingredients);
          }}
          type="submit"
        >
          Search
        </button> */}
      </form>
    </div>
  );
}



