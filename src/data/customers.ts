import { Customer } from "../types/game";

const customerNames = [
  "Alice", "Bob", "Charlie", "Diana", "Erik",
  "Fiona", "George", "Hannah", "Ian", "Julia"
];

const customerDialogs = [
  "I've heard great things about your mushrooms!",
  "Do you have anything for energy?",
  "I need something for my soup...",
  "Looking for medicinal mushrooms.",
  "What's fresh today?"
];

export function generateCustomer(): Customer {
  const name = customerNames[Math.floor(Math.random() * customerNames.length)];
  const dialog = customerDialogs[Math.floor(Math.random() * customerDialogs.length)];
  const budget = Math.floor(Math.random() * 50) + 20; // 20-70 coins
  const patience = Math.floor(Math.random() * 20) + 10; // 10-30 seconds

  return {
    id: `${name}-${Date.now()}`,
    name,
    dialog,
    budget,
    patience,
    wants: [], // Will be filled based on shop inventory
    satisfied: false
  };
}
