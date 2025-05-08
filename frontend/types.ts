export type InventoryMessage = {
    storeId: number;
    itemId: number;
    stock: number;
    price: number;
    category: string;
  };

export type TransactionMessage = {
    userId: number;
    storeId: number;
    items: {
      itemId: number;
      quantity: number;
    }[];
  };

export type CashbackReward = {
    userId: number;
    storeId: number;
    category: string;
    cashbackRate: number;
    reason: string;
    otherRewards: string;
}