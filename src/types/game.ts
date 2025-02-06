export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  type: "food" | "potion" | "item";
  ingredients: string[];
  inStock: number;
}

export interface Player {
  money: number;
  inventory: Map<string, number>;
  reputation: number;
}

export interface Customer {
  id: string;
  name: string;
  dialog: string;
  wants: Item[];
  budget: number;
  patience: number;
  satisfied: boolean;
}

export interface GameState {
  player: Player;
  customers: Customer[];
  inventory: Item[];
  day: number;
  time: number;
  isShopOpen: boolean;
}
