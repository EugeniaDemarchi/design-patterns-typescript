import { StockObserver } from "./StockObserver";

export class InventoryManager {
  private stock: Record<string, number> = {};
  private observers: StockObserver[] = []; // lista generica, sin nombres concretos

  subscribe(observer: StockObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: StockObserver): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  private notify(productId: string, quantity: number): void {
    for (const observer of this.observers) {
      try {
        observer.onLowStock(productId, quantity); // <-- try/catch DENTRO del loop
      } catch (error) {
        // un observer que falla se registra, pero no corta la cadena
        console.error(`[InventoryManager] Un observer fallo (se ignora y se sigue):`, (error as Error).message);
      }
    }
  }

  updateStock(productId: string, quantity: number): void {
    this.stock[productId] = quantity;
    if (quantity < 10) {
      this.notify(productId, quantity);
    }
  }

  sellProduct(productId: string, sold: number): void {
    this.stock[productId] = (this.stock[productId] ?? 0) - sold;
    if (this.stock[productId] < 10) {
      this.notify(productId, this.stock[productId]);
    }
  }
}
