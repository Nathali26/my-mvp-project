// Este componente manejara la logica y la presentacion de la busqueda de recetas
import React from "react";
import { useState } from "react";
import App from "../App";

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
  return(
    <div>
        <h2>Search Recipes by Ingredients</h2>
          <form onSubmit={handleSubmit}>
          <label>Ingredients : 
            <input type="text" 
                    value={ingredients} 
                    name="ingredient" 
                    placeholder="Enter ingredients..." 
                    onChange={handleChange}>
            </input>
          </label>
          <br/><br/>
            <button onClick={()=>{props.onSearch(ingredients)}} type="submit">
            Search
            </button>
            </form>
    </div>
  )
}


