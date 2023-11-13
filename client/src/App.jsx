import { useEffect, useState } from 'react'
import RecipeSearchForm from './components/RecipeSearchForm';
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from './components/Home';// Todavia no se que hacer con esto
import './App.css'

export default function App() {

  const [searchResults, setSearchResults] = useState([])
// 1.Inicializa el estado para almacenar los resultados de la búsqueda de recetas.
// Utiliza useEffect para realizar una operación cuando el componente se monta, como la función getRecipes.

useEffect(() => {
  // Realiza alguna operación inicial si es necesario
  // Por ejemplo, puedes cargar recetas populares al montar el componente
}, []);


// 2.Función para Obtener Recetas:
// Define una función asincrónica para realizar una solicitud al servidor para obtener recetas basadas en ingredientes.

  async function getRecipes(ingredientsList){
    const apiKey = "d7a6bf2ddeba4ff6a6c3a71150c199d6";
    // const queryString = ingredientsList.join(',');
    
      try {
        let response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsList}&apiKey=${apiKey}`,
          // CREO QUE ES MAS FACIL HACERLO CON GET 
          //{
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({ ingredientsList }),
          // }
        );
        if (response.ok) {
          let data = await response.json();
          //set the state
          setSearchResults(Array.isArray(data) ? data : []);
        } else {
          console.log(
            `Server Error: ${response.status} ${response.statusText}`
          );
        }
      } catch (err) {
        //the server never contacted
        console.log(`Network Error, ${err.message}`);
      }
  }

// 3.Función para Actualizar el Estado:
// Crea funciones para actualizar el estado después de realizar operaciones como agregar, actualizar o eliminar recetas.
const handleSearch = async (ingredients)=> {
  // Asegúrate de que 'ingredients' es un array
  try {
    // Si 'ingredients' es un string, lo divides por comas ingredients.split(',')
    await getRecipes(ingredients);
  } catch (err) {
    //the server never contacted
    console.log(`Network Error, ${err.message}`);
  }
}
// 4Interfaz de Usuario:
// Renderiza la interfaz de usuario con los resultados de la búsqueda y un formulario (RecipeSearchForm) para permitir a los usuarios realizar nuevas búsquedas.nicializacion del estado y efecto

  return (
    <div>
      <h1>My Fridge</h1>
            <NavLink to="/" activestyle={{ color: 'pink' }}>Home</NavLink>
            <br />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<RecipeSearchForm recipes={searchResults} />} />
            </Routes>
      <RecipeSearchForm onSearch={handleSearch} />
      {/* Mostrar los resultados de la búsqueda */}
      <div>
        {Array.isArray(searchResults) && searchResults.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.ingredients}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

          

