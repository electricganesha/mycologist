import { Item } from "../../types/game";

interface InventoryItemProps {
  item: Item;
  onBuy?: () => void;
  onSell?: () => void;
}

export function InventoryItem({ item, onBuy, onSell }: InventoryItemProps) {
  return (
    <div className="inventory-item">
      <div className="item-header">
        <h3>{item.name}</h3>
        <span className="item-type">{item.type}</span>
      </div>
      <p className="item-description">{item.description}</p>
      <div className="item-details">
        <span className="price">${item.price}</span>
        <span className="stock">Stock: {item.inStock}</span>
      </div>
      <div className="item-actions">
        {onBuy && (
          <button onClick={onBuy} disabled={item.inStock === 0}>
            Buy
          </button>
        )}
        {onSell && <button onClick={onSell}>Sell</button>}
      </div>
    </div>
  );
}
