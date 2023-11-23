var express = require('express');
var router = express.Router();
const db = require('../model/database.js')

// Buscar recetas por ingredientes
router.post("/by-ingredients", async function (req, res) {
  try {
    const { ingredientsList } = req.body;

    if (!ingredientsList || !Array.isArray(ingredientsList)) {
      return res
        .status(400)
        .json({ error: "Invalid ingredients list provided" });
    }

    // Obtén los IDs de los ingredientes basado en los nombres proporcionados
    const ingredientIds = await db.query(
      `SELECT id FROM ingredients WHERE name IN (?)`,
      [ingredientsList]
    );

    if (ingredientIds.length === 0) {
      return res.status(404).json({ error: "Ingredients not found" });
    }

    const ingredientIdsArray = ingredientIds.map((ingredient) => ingredient.id);

    // Consulta para obtener las recetas que contienen esos ingredientes
    const recipes = await db.query(
      `SELECT DISTINCT recipes.id, recipes.title, recipes.description, recipes.instructions 
      FROM recipes 
      JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id 
      WHERE recipe_ingredients.ingredient_id IN (?)`,
      [ingredientIdsArray]
    );

    if (recipes.length > 0) {
      res.status(200).json({ recipes });
    } else {
      res.status(404).send({ error: "Recipes not found!" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get(
  "/recipes/{id}/analyzedInstructions",
  async function (req, res) {
    try {
      const recipeId = req.params.id;

      const recipeDetails = await db.getRecipeDetails(recipeId);

      if (recipeDetails) {
        res.status(200).json(recipeDetails);
      } else {
        res.status(404).send({ error: "Recipe details not found!" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);


module.exports = router;
