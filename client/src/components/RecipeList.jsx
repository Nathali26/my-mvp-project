
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RecipeList (props) {
    return (
    <div>
        <h2>Recipe List</h2>
        <ul className="recipe-list">
            {recipes.map(recipe => (
                <li key={recipe._id}>
                    <h3>{recipe.tittle}</h3>
                    <p>{recipe.description}</p>
                    <p>{recipe.instructions}</p>
                </li>
            ))}
            </ul>
    </div>
    );
}