export interface ICartItem {
    cartId: number | null
    productId: number
    quantity: number
}

export interface ICartItemDelete {
    cartId: number | null
    productId: number
}

export interface ICartItemUpdate {
    cartId: number | null
    productId: number
    quantity: number
}