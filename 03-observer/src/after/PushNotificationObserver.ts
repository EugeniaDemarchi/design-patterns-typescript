import { StockObserver } from "./StockObserver";

// Observer NUEVO -- se agrega sin tocar InventoryManager.
// Esta clase es la prueba de que el sistema es extensible.
export class PushNotificationObserver implements StockObserver {
  onLowStock(productId: string, quantity: number): void {
    console.log(`[Push] Notificacion al celular: ${productId} tiene ${quantity} unidades`);
  }
}
