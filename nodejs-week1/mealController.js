import myKnex from './database.js';

export const getFutureMeals = async (req, res) => {
    try {
        const now = new Date();
        const futureMeals = await knex('Meal').select('*').where('when', '>', now.toISOString());
        res.json(futureMeals);
    } catch (error) {
        console.error(`Failed to fetch future meals: ${error.message}`);
        res.status(500).json({message: "Error fetching future meals"});
    }
};

export const getPastMeals = async (req, res) => {
    try {
        const now = new Date();
        const pastMeals = await knex('Meal').select('*').where('when', '<', now.toISOString());
        res.json(pastMeals);
    } catch (error) {
        console.error(`Failed to fetch past meals: ${error.message}`);
        res.status(500).json({message: "Error fetching past meals"});
    }
};
export const getAllMeals = async (req, res) => {
    try {
        const allMeals = await knex('Meal').select('*');
        res.json(allMeals);
    } catch (error) {
        console.error(`Failed to fetch meals: ${error.message}`);
        res.status(500).json({message: "Error fetching meals"});
    }
};
export const getFirstMeal = async (req, res) => {
    try {
        const firstMeal = await knex('Meal').select('*').orderBy('id').first();
        if (firstMeal) {
            res.json(firstMeal);
        } else {
            res.status(404).json({message: "No meals found."});
        }
    } catch (error) {
        console.error(`Failed to fetch the first meal: ${error.message}`);
        res.status(500).json({message: "Error fetching the first meal"});
    }
};
export const getLastMeal = async (req, res) => {
    try {
        const lastMeal = await knex('Meal').select('*').orderBy('id', 'desc').first();
        if (lastMeal) {
            res.json(lastMeal);
        } else {
            res.status(404).json({message: "No meals found."});
        }
    } catch (error) {
        console.error(`Failed to fetch the last meal: ${error.message}`);
        res.status(500).json({message: "Error fetching the last meal"});
    }
};
