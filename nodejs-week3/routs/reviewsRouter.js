import express from 'express';
import db from '../database.js'; 

const router = express.Router();

// GET all reviews
router.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await db('reviews').select();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET all reviews for a specific meal
router.get('/api/meals/:meal_id/reviews', async (req, res) => {
    try {
        const { meal_id } = req.params;
        const reviews = await db('reviews').where('meal_id', meal_id);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new review
router.post('/api/reviews', async (req, res) => {
    try {
        const newReview = await db('reviews').insert(req.body).returning('*');
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET a review by id
router.get('/api/reviews/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const review = await db('reviews').where('id', id).first();
        if (review) {
            res.json(review);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update a review by id
router.put('/api/reviews/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await db('reviews').where('id', id).update(req.body).returning('*');
        if (updated.length) {
            res.json(updated[0]);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE a review by id
router.delete('/api/reviews/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await db('reviews').where('id', id).del();
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
