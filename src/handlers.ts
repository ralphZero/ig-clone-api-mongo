import { Response, Request } from 'express';
import { client } from './dbconnect'

export const getAll = (req: Request, res: Response): void => {
    client.connect((err) => {
        if(err) {
            res.status(500).send(err);
            return;
        }
        const collection = client.db('test').collection('cars');
        collection.find().toArray((err, result) => {
            if(err) res.status(500).send(err);
            if(result) res.json(result);
            client.close();
        });
    });
}