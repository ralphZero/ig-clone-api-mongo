import express from 'express';
import cors from 'cors';
import { photoRouter } from './src/routers/photo-router';

const app = express();

const PORT: number = 4000;

app.use(express.json());
app.use(cors());

app.use('/photos', photoRouter)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`); 
});