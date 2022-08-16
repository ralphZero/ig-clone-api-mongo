import express, { Request, Response } from 'express';
import cors from 'cors';
import { getAll } from './src/handlers';

const app = express();

const PORT: number = 3333;

app.use(express.json());
app.use(cors());


app.get('/', getAll);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`); 
});