// Interfaz Suscriptora del patron Observer.
// El InventoryManager solo va a conocer ESTO -- nunca una clase concreta.
export interface StockObserver {
  onLowStock(productId: string, quantity: number): void;
}
