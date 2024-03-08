import express from 'express';
import { getFutureMeals, getPastMeals, getAllMeals, getFirstMeal, getLastMeal } from './mealController.js';

const router = express.Router();

router.get("/future-meals", getFutureMeals);
router.get("/past-meals", getPastMeals);
router.get("/all-meals", getAllMeals);
router.get("/first-meal", getFirstMeal);
router.get("/last-meal", getLastMeal);

export default router;