export interface Photo {
    id?: string,
    photoUrl: string,
    likes: number,
    comments?: string[],
    description?: string
}