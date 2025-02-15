export interface Article {
    _id: string;
    title: string;
    content: string;
    description: string;
    image:string | File;
    createdAt: string;
    updatedAt: string;
}