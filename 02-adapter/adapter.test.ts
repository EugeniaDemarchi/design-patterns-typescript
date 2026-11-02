import { describe, expect, it } from "vitest";
import { GeoServiceAdapter } from "./src/GeoServiceAdapter";
import { OldGeoService, type GeoLocationResult } from "./src/OldGeoService";
import { NewGeoProvider } from "./src/NewGeoProvider";

// Simulates one of the existing client modules: it only knows OldGeoService.
function describeLocation(service: OldGeoService, ip: string): string {
  const { city, country } = service.getLocation(ip);
  return `${city}, ${country}`;
}

describe("Adapter — GeoServiceAdapter", () => {
  it("translates the new provider's nested response into the old flat shape", () => {
    const fromNew = new NewGeoProvider().locate("200.45.123.10");
    const adapted: GeoLocationResult = new GeoServiceAdapter().getLocation("200.45.123.10");

    expect(adapted).toEqual({
      lat: fromNew.coordinates.latitude,
      lng: fromNew.coordinates.longitude,
      city: fromNew.address.locality,
      country: fromNew.address.nation,
    });
  });

  it("can replace OldGeoService without changing client code (Liskov substitution)", () => {
    expect(describeLocation(new OldGeoService(), "1.1.1.1")).toBe("Buenos Aires, Argentina");
    expect(describeLocation(new GeoServiceAdapter(), "1.1.1.1")).toBe("Ciudad de México, México");
  });
});
