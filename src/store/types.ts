import type { ICategory } from "../interfaces/CategoryInterface";
import type { IProduct } from "../interfaces/ProductInterface";
import type { IUser } from "../interfaces/UserInterface";
import type { ICatalogFilter } from "../interfaces/CatalogFilterInterface";
import type { ICart } from "../interfaces/CartInterface";
import type { ICartItem } from "../interfaces/CartItemInterface";
import type { IOrderItem } from "../interfaces/OrderItemInterface";
import type { IOrder } from "../interfaces/OrderInterface";
import type { IStats } from "../interfaces/StatsInterface";


export interface AdminState {
    categories: ICategory[];
    products: IProduct[];
    orders: IOrder[];
    orderItems: IOrderItem[];
    stats: IStats | null;
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

export interface OrderState {
    orderItems: IOrderItem[];
    orderQuantity: number;
    orders: IOrder[];
}