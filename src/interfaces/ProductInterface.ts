export interface IProduct {
    id: number;
    title: string;
    categoryId: number | string;
    quantity: number;
    cost: number;
    info: string | null;
    imageId: string | null;
}

export interface IProductCreate {
    title: string;
    categoryId: number | string | null;
    quantity: number;
    cost: number | null;
    info: string | null;
}

export interface IProductUpdate {
    title: string;
    categoryId: number | string;
    quantity: number;
    cost: number;
    info: string | null;
}