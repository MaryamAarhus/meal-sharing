const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meals").select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

//Get /api/meal all meals


//Post /api/meals - add a new meal to the database

router.post("/", async(req, res) => {
  try{
    const newMeal = req.body;
    const addMeal = await knex("meal").insert(newMeal);
  }
})

module.exports = router;
