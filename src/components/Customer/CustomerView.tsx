import { Customer, Item } from "../../types/game";

interface CustomerViewProps {
  customer: Customer;
  onServe: (customer: Customer, item: Item) => void;
  availableItems: Item[];
}

export function CustomerView({
  customer,
  onServe,
  availableItems,
}: CustomerViewProps) {
  return (
    <div className="customer">
      <div className="customer-header">
        <h3>{customer.name}</h3>
        <span className="customer-budget">${customer.budget}</span>
      </div>
      <div className="customer-dialog">
        <p>{customer.dialog}</p>
      </div>
      <div className="customer-wants">
        <h4>Interested in:</h4>
        <div className="customer-items">
          {availableItems
            .filter((item) => item.price <= customer.budget)
            .map((item) => (
              <button
                key={item.id}
                className="serve-button"
                onClick={() => onServe(customer, item)}
                disabled={item.inStock === 0}
              >
                Offer {item.name} (${item.price})
              </button>
            ))}
        </div>
      </div>
      <div className="customer-patience">
        <div
          className="patience-bar"
          style={{
            width: `${(customer.patience / 30) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
