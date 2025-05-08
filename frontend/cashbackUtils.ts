import { InventoryMessage, TransactionMessage, CashbackReward } from './types';
  
// tunable thresholds
const OVERSUPPLY_THRESHOLD = 100;
const MIN_PURCHASE_COUNT = 5;
  
export function calculateCashbackOpportunities(
  inventoryLogs: InventoryMessage[],
  transactionLogs: TransactionMessage[]
): CashbackReward[] {
  const itemInfo = new Map<number, InventoryMessage>(); // data for specific items
  const storeCategoryStock = new Map<string, number>(); // items of a given category at a specific store
  const userCategoryCounts = new Map<string, number>(); // count of purchased items of given category for specific user

  // sum stock amounts for each category for each store
  for (const item of inventoryLogs) {
    itemInfo.set(item.itemId, item);
    const key = `${item.storeId}-${item.category}`;
    storeCategoryStock.set(key, (storeCategoryStock.get(key) || 0) + item.stock);
  }

  // sum item count for each user for each category
  for (const txn of transactionLogs) {
    for (const it of txn.items) {
      const item = itemInfo.get(it.itemId);
      if (!item) continue;

      const key = `${txn.userId}-${item.category}`;
      userCategoryCounts.set(key, (userCategoryCounts.get(key) || 0) + it.quantity);
    }
  }

  const userBestRewards: Map<number, CashbackReward> = new Map();
  const userOtherRewards: Map<number, CashbackReward[]> = new Map();

  // build cashback opportunities (for stores with oversupply in each category)
  const opportunities: CashbackReward[] = [];
  for (const [key, count] of userCategoryCounts.entries()) {
      if (count < MIN_PURCHASE_COUNT) continue;
  
      const [userIdStr, category] = key.split("-");
      const userId = Number(userIdStr);

      let bestReward: CashbackReward | null = null;
      let otherRewards: CashbackReward[] = [];

      // only give deals to stores with oversupply
      for (const [storeCatKey, stock] of storeCategoryStock.entries()) {
          const [storeIdStr, cat] = storeCatKey.split("-");
          if (cat !== category || stock < OVERSUPPLY_THRESHOLD) continue;
      
          const storeId = Number(storeIdStr);
      
          // dynamically determine cashback rate based on spending and oversupply
          let cashbackRate = 0.03;
          if (count >= 10 || stock >= OVERSUPPLY_THRESHOLD * 2) {
              cashbackRate = 0.04;
          }
          if (count >= 15 || stock >= OVERSUPPLY_THRESHOLD * 3) {
              cashbackRate = 0.05;
          }
      
          const opportunity: CashbackReward = {
              userId,
              storeId,
              category,
              cashbackRate,
              reason: `User purchased ${count} items from this category and store ${storeId} has an oversupply of ${stock - OVERSUPPLY_THRESHOLD} items in this category.`,
              otherRewards: "",
            };
      
            // track 'best' reward for each  user 
            if (!bestReward || opportunity.cashbackRate > bestReward.cashbackRate) {
              if (bestReward) {
                otherRewards.push(bestReward);
              }
              bestReward = opportunity;
            } else {
              otherRewards.push(opportunity);
            }
      }

      // add other rewards to reward object
      if (bestReward) {
        bestReward.otherRewards = otherRewards.length ? 
          ` ${otherRewards.map((r) => `${r.cashbackRate}% cashback at store ${r.storeId}`).join(", ")}.`
          : "";
    
        userBestRewards.set(userId, bestReward);
        userOtherRewards.set(userId, otherRewards);
      }
  }

  return Array.from(userBestRewards.values());
}
  

// recent change is having 1 'best' reward for each user instead of many
// todo: 
// - make reasoning look better
// - alter thresholds to make it a bit more analytical (not all the same 5%)
// - edit data to have more purchases per transaction (so we can increase this threshold)
// walk through file to understand analysis better and comment
// clean up codebase (and github deployment readme)