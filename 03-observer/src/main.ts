import { InventoryManager } from "./after/InventoryManager";
import { StockObserver } from "./after/StockObserver";
import { EmailAlertObserver } from "./after/EmailAlertObserver";
import { AnalyticsObserver } from "./after/AnalyticsObserver";
import { ReplenishObserver } from "./after/ReplenishObserver";
import { PushNotificationObserver } from "./after/PushNotificationObserver";

// -----------------------------------------------------------------
// Test obligatorio: un observer que falla NO debe cortar a los demas.
// -----------------------------------------------------------------
class ObservadorRoto implements StockObserver {
  onLowStock(_productId: string, _quantity: number): void {
    throw new Error("error de red simulado");
  }
}

console.log("=== Caso 1: observer roto en el medio de la cadena ===");
const manager = new InventoryManager();
manager.subscribe(new EmailAlertObserver());
manager.subscribe(new AnalyticsObserver());
manager.subscribe(new ObservadorRoto());
manager.subscribe(new ReplenishObserver());

// Resultado esperado: email OK | ObservadorRoto falla y se registra | replenish OK
manager.updateStock("PROD-001", 5);

console.log("\n=== Caso 2: extensibilidad -- agrego Push SIN tocar InventoryManager ===");
const manager2 = new InventoryManager();
manager2.subscribe(new EmailAlertObserver());
manager2.subscribe(new PushNotificationObserver());
manager2.updateStock("PROD-002", 3);
