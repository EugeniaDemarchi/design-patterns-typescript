export interface NewGeoResult {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: {
    locality: string;
    nation: string;
  };
}

export class NewGeoProvider {
  locate(ip: string): NewGeoResult {
    // Simulación de la respuesta real del proveedor nuevo (estructura anidada, incompatible con la vieja)
    return {
      coordinates: {
        latitude: 19.4326,
        longitude: -99.1332,
      },
      address: {
        locality: "Ciudad de México",
        nation: "México",
      },
    };
  }
}
