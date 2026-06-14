export interface CategorySaving {
  category: string;
  amount: number;
}

export interface AppStats {
  totalOrders: number;
  totalVirtuallySpent: number;
  totalSaved: number;
  purchasesAvoided: number;
  itemsStillWanted: number;
  itemsMaybeLater: number;
  topCategoriesByAvoidedSpend: CategorySaving[];
  currency: string;
}
