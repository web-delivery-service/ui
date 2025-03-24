import type { ICategory } from "../interfaces/CategoryInterface";
import type { IProduct } from "../interfaces/ProductInterface";
import type { IUser } from "../interfaces/UserInterface";

export interface AdminState {
    categories: ICategory[];
    products: IProduct[];
}

export interface UserState {
    isAdmin: boolean;
    accessToken: string | null;
    user: IUser | null;
}