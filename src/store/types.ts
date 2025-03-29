import type { ICategory } from "../interfaces/CategoryInterface";
import type { IProduct } from "../interfaces/ProductInterface";
import type { IUser } from "../interfaces/UserInterface";
import type { ICatalogFilter } from "../interfaces/CatalogFilterInterface";
import type { ICart } from "../interfaces/CartInterface";
import type { ICartItem } from "../interfaces/CartItemInterface";

export interface AdminState {
    categories: ICategory[];
    products: IProduct[];
}

export interface UserState {
    isAdmin: boolean;
    accessToken: string | null;
    user: IUser | null;
}

export interface BaseState {
    categories: ICategory[];
    products: IProduct[];
    filter: ICatalogFilter;
}

export interface CartState {
    cart: ICart | null;
    cartItems: ICartItem[];
    cartQuantity: number;
}