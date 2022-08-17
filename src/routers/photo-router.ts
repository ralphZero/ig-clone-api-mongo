import { Router, Request, Response } from 'express';
import { PhotoServices } from '../services/photo-services';

export const photoRouter = Router();

photoRouter.get('/', async (req: Request, res: Response) => {
    const result = await PhotoServices.getAllPhotos()
    res.status(200).send(result);
});

photoRouter.post('/', async (req: Request, res: Response) => {
    const { photoUrl, description } = req.body;
    if(!photoRouter) {
        res.status(400).send('Photo url required');
    }
    const insertedId = await PhotoServices.createPhoto({ photoUrl, description });

    res.status(201).send({ insertedId });
});