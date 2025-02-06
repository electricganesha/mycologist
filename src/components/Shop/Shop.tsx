import { Item } from "../../types/game";
import { InventoryItem } from "../Inventory/InventoryItem";

interface ShopProps {
  inventory: Item[];
  onBuyItem: (item: Item) => void;
}

export function Shop({ inventory, onBuyItem }: ShopProps) {
  return (
    <div className="shop">
      <h2>Mushroom Shop</h2>
      <div className="inventory-grid">
        {inventory.map((item) => (
          <InventoryItem
            key={item.id}
            item={item}
            onBuy={() => onBuyItem(item)}
          />
        ))}
      </div>
    </div>
  );
}
