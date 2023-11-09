var express = require('express');
var router = express.Router();

/* GET home page. */

// Get a list of ingredients

router.get('/', function(req, res, next) { // /api/ingredients/
  db("SELECT * FROM ingredients;")
  .then(results => {
    res.send(result.data);
  })
  .catch(err => res.status(500).send(err));
});

// Get one ingredient by id
router.get("/:id", async function (req,res,next){ // /api/ingredients/:id
  const ingredientId = req.params.id;
  try{
    let result = await db(`SELECT * FROM students WHERE id = ${ingredientId}`);
    if (result.data.length === 1){
      // ingredient exists
      res.send.apply(result.data[0]);
    }
    else{
      res.status(404).send({error: "Ingredient not found!"});
    }
  } catch (error){
    res.status(500).send({error: error.message})
  }
});

// Buscar recetas por ingredientes

router.post("/by-ingredients", async function (req,res) {// /api/recipes/by-ingredients
  try{

    const { ingredientsList } = req.body;
    const recipes = await db.query(`SELECT * FROM recipes WHERE ingredients IN (${ingredients.join(',')})`);
    
    if (recipes.data.length === 1){
      // recipes with ingredients exists
      res.status(200).json(recipes);
    } else {
      res.status(404).send({error: "Recipes not found!"});
    }
  } catch (error){
    res.status(500).send({error: error.message})
  }

  
});


module.exports = router;
