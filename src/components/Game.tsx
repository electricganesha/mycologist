import { useState, useEffect } from "react";
import { GameState, Player, Item, Customer } from "../types/game";
import { Shop } from "./Shop/Shop";
import { CustomerView } from "./Customer/CustomerView";
import { initialMushrooms } from "../data/mushrooms";
import { generateCustomer } from "../data/customers";
import { ShopScene } from "./3d/ShopScene";

const SHOP_OPEN_HOUR = 8; // 8 AM
const SHOP_CLOSE_HOUR = 20; // 8 PM
const MAX_CUSTOMERS = 3;

const initialPlayer: Player = {
  money: 1000,
  inventory: new Map(),
  reputation: 50,
};

const initialGameState: GameState = {
  player: initialPlayer,
  customers: [],
  inventory: initialMushrooms,
  day: 1,
  time: 8, // Start at 8 AM
  isShopOpen: true,
};

export function Game() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [showInventory, setShowInventory] = useState(false);

  // Time and customer management
  useEffect(() => {
    const gameLoop = setInterval(() => {
      setGameState((prevState) => {
        const newTime = (prevState.time + 1) % 24;
        const isShopOpen =
          newTime >= SHOP_OPEN_HOUR && newTime < SHOP_CLOSE_HOUR;

        // Update customers' patience
        const updatedCustomers = prevState.customers
          .map((customer) => ({
            ...customer,
            patience: customer.patience - 1,
          }))
          .filter((customer) => customer.patience > 0 && !customer.satisfied);

        // Add new customer if shop is open and we have space
        const newCustomers = [...updatedCustomers];
        if (
          isShopOpen &&
          newCustomers.length < MAX_CUSTOMERS &&
          Math.random() < 0.3
        ) {
          // 30% chance each second
          newCustomers.push(generateCustomer());
        }

        return {
          ...prevState,
          time: newTime,
          day: newTime === 0 ? prevState.day + 1 : prevState.day,
          isShopOpen,
          customers: newCustomers,
        };
      });
    }, 1000);

    return () => clearInterval(gameLoop);
  }, []);

  const handleBuyItem = (item: Item) => {
    if (gameState.player.money >= item.price && item.inStock > 0) {
      setGameState((prevState) => {
        const updatedInventory = [...prevState.inventory];
        const itemIndex = updatedInventory.findIndex((i) => i.id === item.id);
        updatedInventory[itemIndex] = {
          ...item,
          inStock: item.inStock - 1,
        };

        const playerInventory = new Map(prevState.player.inventory);
        const currentAmount = playerInventory.get(item.id) || 0;
        playerInventory.set(item.id, currentAmount + 1);

        return {
          ...prevState,
          inventory: updatedInventory,
          player: {
            ...prevState.player,
            money: prevState.player.money - item.price,
            inventory: playerInventory,
          },
        };
      });
    }
  };

  const handleServeCustomer = (customer: Customer, item: Item) => {
    setGameState((prevState) => {
      const updatedInventory = [...prevState.inventory];
      const itemIndex = updatedInventory.findIndex((i) => i.id === item.id);
      updatedInventory[itemIndex] = {
        ...item,
        inStock: item.inStock - 1,
      };

      const updatedCustomers = prevState.customers.map((c) =>
        c.id === customer.id ? { ...c, satisfied: true } : c
      );

      return {
        ...prevState,
        inventory: updatedInventory,
        customers: updatedCustomers,
        player: {
          ...prevState.player,
          money: prevState.player.money + item.price,
          reputation: prevState.player.reputation + 1,
        },
      };
    });
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div>Day: {gameState.day}</div>
        <div>Time: {gameState.time}:00</div>
        <div>Money: ${gameState.player.money}</div>
        <div>Reputation: {gameState.player.reputation}</div>
        <div
          className={`shop-status ${gameState.isShopOpen ? "open" : "closed"}`}
        >
          Shop is {gameState.isShopOpen ? "Open" : "Closed"}
        </div>
        <button onClick={() => setShowInventory(!showInventory)}>
          {showInventory ? "View Shop" : "View Inventory"}
        </button>
      </div>
      <div className="game-main">
        <div className="game-3d-view">
          <ShopScene
            gameState={gameState}
            onInteract={(itemId) => {
              const item = gameState.inventory.find(
                (item) => item.id === itemId
              );
              if (item) {
                handleBuyItem(item);
              }
            }}
          />
        </div>
        {showInventory && (
          <div className="game-ui">
            <div className="shop-area">
              <Shop inventory={gameState.inventory} onBuyItem={handleBuyItem} />
            </div>
            <div className="customer-area">
              <h2>Customers</h2>
              {gameState.isShopOpen ? (
                gameState.customers.length > 0 ? (
                  gameState.customers.map((customer) => (
                    <CustomerView
                      key={customer.id}
                      customer={customer}
                      onServe={handleServeCustomer}
                      availableItems={gameState.inventory}
                    />
                  ))
                ) : (
                  <p>Waiting for customers...</p>
                )
              ) : (
                <p>Shop is closed. Opens at {SHOP_OPEN_HOUR}:00</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
