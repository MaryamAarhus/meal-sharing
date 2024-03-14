import express from 'express'
import mealsRouter from './routs/mealsRouter.js';
import reviewsRouter from './routs/reviewsRouter.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use(mealsRouter);
app.use(reviewsRouter);

app.get('/', (req, res) =>{
    res.send('Meal Sharing API is running!');
});

app.listen(port, () =>{
    console.log(`Meal-sharing API listening at http://localhost:${port}`);
});