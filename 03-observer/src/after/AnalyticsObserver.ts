import { StockObserver } from "./StockObserver";

export class AnalyticsObserver implements StockObserver {
  onLowStock(productId: string, _quantity: number): void {
    console.log(`[Analytics] Evento registrado para ${productId}`);
  }
}
