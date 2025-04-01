import { OrderStatusEnum } from "./enums/OrderStatusEnum";
import type { IUser } from "./UserInterface";
import type { IOrderItem } from "./OrderItemInterface";


export interface IOrderCreate {
    userId: number | null;
    status: OrderStatusEnum | null;
    cost: number
}

export interface IOrder {
    id: number;
    userId: number;
    status: OrderStatusEnum;
    cost: number;
    user: IUser;
    products: IOrderItem[];
}