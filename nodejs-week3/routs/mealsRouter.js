import express from 'express';
import knex from '../database.js';

const router = express.Router();

router.get('api/meals', async (req, res) =>{
    let query = knex('meals');

    if (req.query.maxPrice) {
        query = query.where('price', '<', Number(req.query.maxPrice));
    }

    if (req.query.availableReservations === 'true') {
        query = query.join('reservations', 'meals.id', '=', 'reservations.meal_id')
        .select('meals.*')
        .whereRaw('meals.max_Reservations > (select count(*) from reservations where meals.id = reservations.meal_id')
        .groupBy('meals.id');
    }
    if(req.query.dateAfter) {
        query = query.where('date', '<', new Date(req.query.dateBefore));
    }

    if(req.query.limit) {
        query = query.limit(Number(req.query.limit));
  }

  if (req.query.sortKey) {
    const sortDir = req.query.sortDir && req.query.sortDir === 'desc' ? 'desc' : 'asc';
    query = query.orderBy(req.query.sortKey, sortDir);
  }

  try {
    const meals = await query;
    res.json(meals);
  } catch (error) {
    res.status(500).send('An error occurred while retrieving meals');
  }
    
});

export default router;
