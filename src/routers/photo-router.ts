import { Router, Request, Response } from 'express';
import { PhotoServices } from '../services/photo-services';

export const photoRouter = Router();

photoRouter.get('/', async (req: Request, res: Response) => {
    const result = await PhotoServices.getAllPhotos()
    res.status(200).send(result);
});

photoRouter.post('/', async (req: Request, res: Response) => {
    const { photoUrl, description, likes = 0 } = req.body;
    if(!photoRouter) {
        res.status(400).send('Photo url required');
    }
    const insertedId = await PhotoServices.createPhoto({ photoUrl, description, likes });

    res.status(201).send({ insertedId });
});

photoRouter.patch('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { likes } = req.body;
    if(!likes) {
        res.status(400).send('Likes are required');
    }
    const photo = await PhotoServices.updateLikes(id, likes);
    res.status(200).json(photo);
});

photoRouter.patch('/:id/comments', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { comment } = req.body;
    if(!comment) {
        res.status(400).send('A comment is required');
    }
    const photo = await PhotoServices.createComment(id, comment);
    res.status(200).json(photo);
});