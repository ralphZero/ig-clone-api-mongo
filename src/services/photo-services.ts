import { ObjectId } from "mongodb";
import { db } from "../db/dbconnect";
import { Photo } from "../models/photo";

interface PhotoServices {
    updateLikes(id: string, inc:number): Promise<Photo>;
    createPhoto(photo: Photo): Promise<string>;
    createComment(id: string, comment: string): Promise<Photo> | undefined;
    getAllPhotos(): Promise<Photo[]>;
}

const getAllPhotos = async (): Promise<Photo[]> => {
    const photoCollection = (await db()).collection<Photo>('photos');
    const photos = await photoCollection.find().toArray()
    return photos;
}

const createPhoto = async (photo: Photo): Promise<string> => {
    const photoCollection = (await db()).collection<Photo>('photos');
    const res = await photoCollection.insertOne(photo);
    return res.insertedId.toString();
}

const updateLikes = async (id: string, inc: number = 1): Promise<Photo> => {
    const photoCollection = (await db()).collection<Photo>('photos');
    const res = await photoCollection.findOneAndUpdate(
        { _id: new ObjectId(id) }, {$inc: {"likes": inc} }
        );
    const updatedPhoto = res.value as Photo;
    updatedPhoto.likes += inc;
    return updatedPhoto as Photo;
}

const createComment = async (id: string, comment: string): Promise<Photo> => {
    const photoCollection = (await db()).collection<Photo>('photos');
    const res = await photoCollection.findOneAndUpdate(
        { _id: new ObjectId(id) }, {$push: {"comments": comment}} 
    );
    const updatedPhoto = res.value as Photo;
    updatedPhoto.comments?.push(comment);
    return updatedPhoto;
}

export const PhotoServices: PhotoServices = { getAllPhotos, createPhoto, updateLikes, createComment }