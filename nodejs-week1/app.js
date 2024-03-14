import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import mealsRouter from './mealsRouter.js';

const app = express();

// Middleware
// app.use(express.static(buildPath));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cors()); 

const apiPath = process.env.API_PATH || '/nodejs-week1'; 
app.use(apiPath, mealsRouter);

app.use("*", (req, res) => {
    res.status(404).json({ message: "API endpoint not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 
