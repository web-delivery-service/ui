export interface IStats {
    categoryQuantity: number;
    productQuantity: number;
    
    orderQuantity: number;
    totalCost: number;
}

export interface IStatsFilter {
    startDate: string | null;
    endDate: string | null;
}