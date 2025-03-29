import { OrderStatusEnum } from "./enums/OrderStatusEnum";

export interface IOrderCreate {
    userId: number | null;
    status: OrderStatusEnum;
    cost: number
}