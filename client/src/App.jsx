import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import RecipeSearchForm from "./components/RecipeSearchForm";
import RecipesList from "./components/RecipesList";
import RecipeDetails from "./components/RecipeDetails";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
  
  }, []);

  async function getRecipes(ingredientsList) {
    const apiKey = "d7a6bf2ddeba4ff6a6c3a71150c199d6";
    try {
      let response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsList}&apiKey=${apiKey}`
      );
      if (response.ok) {
        let data = await response.json();
        setSearchResults(Array.isArray(data) ? data : []);
      } else {
        console.log(`Server Error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network Error: ${err.message}`);
    }
  }

  const handleSearch = async (ingredients) => {
    try {
      await getRecipes(ingredients);
    } catch (err) {
      console.log(`Network Error: ${err.message}`);
    }
  };



  
return (
  <div>
    <div className="fixed-header">
      <h1 className="header-title">My Fridge </h1>
      <img
        src="https://png.pngtree.com/png-vector/20230801/ourmid/pngtree-funny-smile-cartoon-illustration-refrigerator-vector-png-image_6829840.png"
        alt="FRIDGE SMILING"
        className="header-image"
      ></img>
    </div>
    <NavLink
      to="/"
      className={({ isActive }) => (isActive ? "activeNavLink" : "")}
    >
      Home{" "}
    </NavLink>
    <NavLink
      to="/search"
      className={({ isActive }) => (isActive ? "activeNavLink" : "")}
    >
      Search{" "}
    </NavLink>
    <NavLink
      to="/recipes/:id"
      className={({ isActive }) => (isActive ? "activeNavLink" : "")}
    >
      Recipes{" "}
    </NavLink>

    <br />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/search"
        element={
          <>
            <RecipeSearchForm onSearch={handleSearch} />
            <RecipesList recipes={searchResults} />
          </>
        }
      ></Route>

      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
  </div>
);
}
 