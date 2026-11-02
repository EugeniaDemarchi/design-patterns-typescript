export interface GeoLocationResult {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export class OldGeoService {
  getLocation(ip: string): GeoLocationResult {
    // Simulación de la respuesta real del proveedor viejo (sin mantenimiento, pero todavía funciona)
    return {
      lat: -34.6037,
      lng: -58.3816,
      city: "Buenos Aires",
      country: "Argentina",
    };
  }
}
