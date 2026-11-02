import { describe, expect, it, vi } from "vitest";
import { InventoryManager } from "./src/after/InventoryManager";
import type { StockObserver } from "./src/after/StockObserver";

const spyObserver = () => ({
  onLowStock: vi.fn<StockObserver["onLowStock"]>(),
});

describe("Observer — InventoryManager", () => {
  it("notifies every subscriber when stock drops below 10", () => {
    const manager = new InventoryManager();
    const a = spyObserver();
    const b = spyObserver();
    manager.subscribe(a);
    manager.subscribe(b);

    manager.updateStock("PROD-001", 5);

    expect(a.onLowStock).toHaveBeenCalledWith("PROD-001", 5);
    expect(b.onLowStock).toHaveBeenCalledWith("PROD-001", 5);
  });

  it("does not notify while stock is 10 or more", () => {
    const manager = new InventoryManager();
    const a = spyObserver();
    manager.subscribe(a);

    manager.updateStock("PROD-001", 10);

    expect(a.onLowStock).not.toHaveBeenCalled();
  });

  it("notifies after a sale leaves stock low", () => {
    const manager = new InventoryManager();
    const a = spyObserver();
    manager.subscribe(a);
    manager.updateStock("PROD-001", 15);

    manager.sellProduct("PROD-001", 8);

    expect(a.onLowStock).toHaveBeenCalledWith("PROD-001", 7);
  });

  it("stops notifying after unsubscribe", () => {
    const manager = new InventoryManager();
    const a = spyObserver();
    manager.subscribe(a);
    manager.unsubscribe(a);

    manager.updateStock("PROD-001", 1);

    expect(a.onLowStock).not.toHaveBeenCalled();
  });

  it("a failing observer does not break the notification chain", () => {
    const manager = new InventoryManager();
    const before = spyObserver();
    const broken: StockObserver = {
      onLowStock: () => {
        throw new Error("simulated network error");
      },
    };
    const after = spyObserver();
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    manager.subscribe(before);
    manager.subscribe(broken);
    manager.subscribe(after);

    manager.updateStock("PROD-001", 3);

    expect(before.onLowStock).toHaveBeenCalled();
    expect(after.onLowStock).toHaveBeenCalled();
    expect(errorLog).toHaveBeenCalledOnce();
    errorLog.mockRestore();
  });
});
