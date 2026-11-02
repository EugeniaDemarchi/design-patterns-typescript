import { OldGeoService } from "./OldGeoService";
import { GeoServiceAdapter } from "./GeoServiceAdapter";

// --- ANTES: así usan los 40 archivos del sistema al proveedor viejo ---
const geo = new OldGeoService();
const data = geo.getLocation("200.45.123.10");
console.log("ANTES ->", data.city, data.lat);

// --- DESPUÉS: único cambio — se reemplaza la instancia, nada más ---
let geoDespues: OldGeoService = new GeoServiceAdapter();
const dataDespues = geoDespues.getLocation("200.45.123.10");
console.log("DESPUÉS ->", dataDespues.city, dataDespues.lat);
