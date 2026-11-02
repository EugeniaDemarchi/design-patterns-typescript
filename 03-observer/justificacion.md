# Justificación — refactor con Observer

El problema no era la falta de un patrón, era el acoplamiento: `InventoryManager`
conocía por nombre a `EmailAlertService`, `AnalyticsDashboard` y `AutoReplenishment`,
así que cualquier cambio en esos tres —o sumar un cuarto canal— obligaba a tocar una
clase que no tiene nada que ver con emails ni con analytics.

Con Observer, `InventoryManager` pasó a depender solo de la interfaz `StockObserver`:
no sabe cuántos observers hay ni quiénes son, solo que implementan `onLowStock()`.
Por eso pude agregar `PushNotificationObserver` sin cambiar una sola línea del manager.

La decisión que más importa acá es dónde va el `try/catch`: adentro del `for`,
envolviendo cada llamada individual. Si estuviera afuera del loop, `ObservadorRoto`
(probado en el código) tumbaría toda la cadena de notificaciones en vez de fallar solo él.
