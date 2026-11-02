import { StockObserver } from "./StockObserver";

export class EmailAlertObserver implements StockObserver {
  onLowStock(productId: string, quantity: number): void {
    console.log(`[Email] Alerta: stock bajo de ${productId} (quedan ${quantity})`);
  }
}
