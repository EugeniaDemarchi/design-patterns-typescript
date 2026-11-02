// ============================================================
// VERSION "ANTES" -- codigo tal como lo entrega el enunciado.
// Problema: InventoryManager conoce por nombre a los 3 servicios
// concretos. Si cualquiera cambia (o agregamos uno nuevo), hay que
// abrir esta clase, que no tiene nada que ver con emails ni analytics.
// ============================================================

class EmailAlertService {
  sendLowStockAlert(productId: string, quantity: number): void {
    console.log(`[Email] Alerta: stock bajo de ${productId} (quedan ${quantity})`);
  }
}

class AnalyticsDashboard {
  recordLowStockEvent(productId: string): void {
    console.log(`[Analytics] Evento registrado para ${productId}`);
  }
}

class AutoReplenishment {
  triggerOrder(productId: string, amount: number): void {
    console.log(`[Reposicion] Orden creada: ${amount} unidades de ${productId}`);
  }
}

class InventoryManager {
  private stock: Record<string, number> = {};

  // <-- ACA esta el problema: instancia y conoce por nombre a los 3 servicios.
  private emailService = new EmailAlertService();
  private analytics = new AnalyticsDashboard();
  private replenishment = new AutoReplenishment();

  updateStock(productId: string, quantity: number): void {
    this.stock[productId] = quantity;
    if (quantity < 10) {
      this.emailService.sendLowStockAlert(productId, quantity);
      this.analytics.recordLowStockEvent(productId);
      this.replenishment.triggerOrder(productId, 100);
    }
  }

  sellProduct(productId: string, sold: number): void {
    this.stock[productId] = (this.stock[productId] ?? 0) - sold;
    if (this.stock[productId] < 10) {
      this.emailService.sendLowStockAlert(productId, this.stock[productId]);
      this.analytics.recordLowStockEvent(productId);
      this.replenishment.triggerOrder(productId, 100);
    }
  }
}

// ------------------------------------------------------------
// Demo: si mañana pedimos agregar notificaciones push, hay que
// volver a entrar a InventoryManager y tocar update_stock y
// sell_product a mano. Eso es el acoplamiento que vamos a resolver
// con Observer en la version "despues".
// ------------------------------------------------------------
const manager = new InventoryManager();
manager.updateStock("PROD-001", 5);
