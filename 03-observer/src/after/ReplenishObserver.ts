import { StockObserver } from "./StockObserver";

export class ReplenishObserver implements StockObserver {
  onLowStock(productId: string, _quantity: number): void {
    console.log(`[Reposicion] Orden creada: 100 unidades de ${productId}`);
  }
}
