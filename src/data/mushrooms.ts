import { Item } from "../types/game";

export const initialMushrooms: Item[] = [
  {
    id: "common_button",
    name: "Button Mushroom",
    description: "A common, versatile mushroom perfect for cooking.",
    price: 5,
    type: "food",
    ingredients: [],
    inStock: 10
  },
  {
    id: "shiitake",
    name: "Shiitake",
    description: "Savory mushroom with immune-boosting properties.",
    price: 8,
    type: "food",
    ingredients: [],
    inStock: 8
  },
  {
    id: "reishi",
    name: "Reishi",
    description: "Ancient medicinal mushroom used in potions.",
    price: 15,
    type: "potion",
    ingredients: [],
    inStock: 5
  },
  {
    id: "cordyceps",
    name: "Cordyceps",
    description: "Rare mushroom with energizing properties.",
    price: 25,
    type: "potion",
    ingredients: [],
    inStock: 3
  }
];
