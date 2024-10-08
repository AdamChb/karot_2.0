// ------------------------------
//  Karot_2.0 - server.js
//
//  Mathias BENOIT
//  Adam CHABA
//  Eva MAROT
//  Sacha PORTAL
//
//  This file contains the functions to connect the
//  request functions to the database server.
// ------------------------------

// Require is the keyword used to import modules
// You can import local files by using the relative path

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api_db = require("../database/api_db");
const init_db = require("../database/init_db");
const account_db = require("../database/account_db");
const like_db = require("../database/like_db");
const recipe_db = require("../database/recipe_db");
const to_require_db = require("../database/to_require_db");
const ingredient_db = require("../database/ingredient_db");

// Configuration about the server
const hostname = "127.0.0.1";
const port = 3000;

// Create a new instance of express
const server = express();

server.use(cors("*"));
server.use(bodyParser.json());

// When a GET requets is made at the adress /getMostLiked, the server respond (res) with the return of the function getMostLiked

// Function to link to the request getMostLiked
server.get("/api/get-most-liked", async (req, res) => {
  const userId = req.query.userId;
  res.send(await api_db.getMostLiked(4,userId));
});

server.get("/getRecipe", async (req, res) => {
  const { id } = req.query;
  res.send(await recipe_db.getRecipe(id));
});

server.post("/insertRecipe", async (req, res) => {
  let { name, ingredients, steps } = req.body;
  console.log(req.body);
  ingredients = ingredients.split("\n");
  try {
    const recipe_id = await recipe_db.insertRecipe({
      name: name,
      steps: steps,
      image: null,
      userId: 1,
    });
    console.log(recipe_id);
    for (let ingredient of ingredients) {
      ingredient = ingredient.split(":");
      ingredient = ingredient.map((x) => x.trim());
      let ingredient_id = await ingredient_db.searchIngredient();
      if (ingredient_id == null) {
        ingredient_id = await ingredient_db.insertIngredient(ingredient);
      }
      await to_require_db.insertRequiredIngredient({
        recipeId: recipe_id,
        ingredientId: ingredient_id,
        quantity: ingredient[1],
      });
    }
    res.send("Recipe inserted");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// The same method exist with POST, PUT and DELETE
// Request body is in req.body, it contains all the data sent by the client in the request body

// Add an allergy
server.post("/api/add-allergy", async (req, res) => {
  const { userId, ingredientId } = req.body; // Get the data sent by the form
  try {
    const result = await api_db.addAllergy(userId, ingredientId);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an allergy
server.delete("/api/delete-allergy", async (req, res) => {
  const { userId, ingredientId } = req.query;
  try {
    const result = await api_db.deleteAllergy(userId, ingredientId);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Register a new user
server.post("/api/new-user", async (req, res) => {
  const user = req.body;
  try {
    const result = await account_db.signUp(user);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Log in a user
server.post("/api/log-in", async (req, res) => {
  const info = req.body;
  try {
    const result = await account_db.logIn(info);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Fetch random recipes
server.get("/api/random-recipes", async (req, res) => {
  try {
    const result = await api_db.getRandomRecipes(5, req.query.userId);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add a recipe
server.post("/api/add-recipe", async (req, res) => {
  const { name, ingredients, steps, image, ID_Creator } = req.body; // Make sure to include the user ID if necessary
  try {
    const result = await api_db.addRecipe(
      name,
      ingredients,
      steps,
      image,
      ID_Creator
    ); // Implement this function in api_db.js
    res.json({ message: "Recipe added successfully!", recipe: result });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Check Meal
server.delete("/api/check-meal", async (req, res) => {
  const { userId, recipeId } = req.query;
  try {
    const result = await api_db.checkMeal(userId, recipeId);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get Planned Meals
server.get("/api/get-planned-meals", async (req, res) => {
  const userId = req.query.userId;
  res.send(await api_db.getPlannedMeals(userId));
});

// Add a meal
server.post("/api/add-meal", async (req, res) => {
  const { userId, recipeId } = req.body;
  try {
    const result = await api_db.addMeal(userId, recipeId);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Register a new user
server.post("/api/new-user", async (req, res) => {
  const user = req.body;
  try {
    const result = await account_db.signUp(user);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Log in a user
server.post("/api/log-in", async (req, res) => {
  const info = req.body;
  try {
    const result = await account_db.logIn(info);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Get an specific recipe by id
server.get("/api/get-recipe", async (req, res) => {
  const id_user = req.query.id_user;
  const id_recipe = req.query.id_recipe;
  try {
    const result = await api_db.getRecipe(id_user, id_recipe);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Like a recipe
server.post("/api/like-recipe", async (req, res) => {
  const info = req.body;
  try {
    const result = await like_db.likeRecipe(info);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Unlike a recipe
server.delete("/api/unlike-recipe", async (req, res) => {
  const info = {
    id_user: req.query.id_user,
    id_recipe: req.query.id_recipe,
  };
  try {
    const result = await like_db.unlikeRecipe(info);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// The same method exist with POST, PUT and DELETE
// Request body is in req.body, it contains all the data sent by the client in the request body

// Function to activate the initialisation of the database
server.get("/initdb", async (req, res) => {
  await init_db.doAll();
  res.send("Database initialized");
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
