# Design Patterns in TypeScript

[![CI](https://github.com/EugeniaDemarchi/design-patterns-typescript/actions/workflows/ci.yml/badge.svg)](https://github.com/EugeniaDemarchi/design-patterns-typescript/actions/workflows/ci.yml)

Three refactoring exercises, one per pattern family. Each one starts from code with a real design problem (**before**), applies a pattern (**after**), and explains why that pattern and not another. UML diagrams of both versions and unit tests are included.

| # | Pattern | Family | Problem it solves here |
|---|---|---|---|
| [01](01-factory-method) | **Factory Method** | Creational | A report service that instantiated every format with an `if/else` chain and `any` types |
| [02](02-adapter) | **Adapter** | Structural | Replacing a geolocation provider used in 40 files with a new one that has an incompatible response shape |
| [03](03-observer) | **Observer** | Behavioral | An inventory class hard-wired to email, analytics and restocking services |

## SOLID principles in practice

| Principle | Where it shows up |
|---|---|
| **Single Responsibility** | `ReportService` uses reports, `ReportFactory` creates them. `InventoryManager` tracks stock; each observer handles one channel. |
| **Open/Closed** | `HTMLReport` and `PushNotificationObserver` were added **without modifying** `ReportService` or `InventoryManager`. |
| **Liskov Substitution** | `GeoServiceAdapter` extends `OldGeoService` and can replace it anywhere; a test runs the same client code against both. |
| **Interface Segregation** | `StockObserver` exposes a single method, `onLowStock()`. |
| **Dependency Inversion** | High-level classes depend on abstractions (`Report`, `StockObserver`), never on concrete classes. |

## Run it

```bash
npm ci
npm test               # 13 unit tests (Vitest)
npm run typecheck      # TypeScript strict mode
npm run demo:factory   # before vs after output
npm run demo:adapter
npm run demo:observer
```

## About this project

Individual coursework for **Metodología de Sistemas II** (Universidad Tecnológica Nacional, *Tecnicatura Universitaria en Programación*). The "before" code was provided by the course; the refactors, design justifications and diagrams are mine. For this portfolio version I added the unit tests and CI. Code comments are in Spanish.

**Author:** Eugenia Demarchi · [LinkedIn](https://www.linkedin.com/in/eugenia-demarchi/) · [GitHub](https://github.com/EugeniaDemarchi)
