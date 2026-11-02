import { OldGeoService, GeoLocationResult } from "./OldGeoService";
import { NewGeoProvider } from "./NewGeoProvider";
/*
 * Elegí Adapter y no una refactorización masiva ni una Facade: acá hay dos interfaces
 * puntuales que no combinan (OldGeoService espera un objeto plano; NewGeoProvider devuelve
 * objetos anidados con otros nombres), no un subsistema completo de muchas clases que
 * necesite un punto de entrada simple (eso sería Facade). Reescribir los 40 archivos era
 * inviable, y tampoco podía modificar NewGeoProvider (es de un tercero).
 * Si mañana aparece un FutureGeoProvider con otra estructura, el cambio queda contenido
 * en GeoServiceAdapter: el tipo del campo `provider`, la instancia creada en el constructor,
 * y la traducción dentro de getLocation() (porque probablemente tenga otra forma de nuevo).
 * Ningún otro archivo del sistema se toca.
 */

export class GeoServiceAdapter extends OldGeoService {
  private provider: NewGeoProvider;

  constructor() {
    super();
    this.provider = new NewGeoProvider();
  }

  override getLocation(ip: string): GeoLocationResult {
    const resultado = this.provider.locate(ip);

    return {
      lat: resultado.coordinates.latitude,
      lng: resultado.coordinates.longitude,
      city: resultado.address.locality,
      country: resultado.address.nation,
    };
  }
}
