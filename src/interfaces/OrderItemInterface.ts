export interface IOrderItem {
    orderId: number | null
    productId: number
    quantity: number
}

export interface IOrderItemCreate {
    orderId: number | null
    productId: number
    quantity: number
}

export interface IOrderItemDelete {
    orderId: number | null
    productId: number
}

export interface IOrderItemUpdate {
    orderId: number | null
    productId: number
    quantity: number
}