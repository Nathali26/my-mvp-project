import { useState } from 'react'
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from './components/Home';
import Recipes from './components/IngredientsList';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1> My Fridge </h1>
      <NavLink to="/" activeStyle="active">
        Home
      </NavLink>
      <br />
      <NavLink to="/students">Students</NavLink>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<StudentsList />} />
      </Routes>
    </div>
  );
}

export default App
