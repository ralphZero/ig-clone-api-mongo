import { db } from "../db/dbconnect";
import { Photo } from "../models/photo";

export interface PhotoServices {
    // updateLikes(id: string, inc:number): Promise<Photo>;
    createPhoto(photo: Photo): Promise<string>;
    // createComment(id: string, comment: string): Promise<Photo> | undefined;
    getAllPhotos(): Promise<Photo[]>;
}

export const getAllPhotos = async (): Promise<Photo[]> => {
    const photoCollection = (await db()).collection<Photo>('photos');
    const photos = await photoCollection.find().toArray()
    return photos;
}

export const createPhoto = async (photo: Photo): Promise<string> => {
    const photoCollection = (await db()).collection<Photo>('photos');
    const res = await photoCollection.insertOne(photo);
    return res.insertedId.toString();
}

// export const updateLikes = async (id: string, inc: number = 1): Promise<Photo> => {

// }

// export const createComment = async (id: string, comment: string): Promise<Photo> => {
//     return undefined;
// }

export const PhotoServices: PhotoServices = { getAllPhotos, createPhoto }