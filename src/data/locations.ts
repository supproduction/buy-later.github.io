/**
 * Static coordinate data for the SIMULATED delivery map.
 *
 * These are approximate city-centre coordinates we ship ourselves — NOT precise
 * coordinates derived from the user. The user only ever enters a city + country
 * name; we never request geolocation or store precise coordinates from input.
 */

export interface LatLng {
  lat: number;
  lng: number;
}

export interface CityEntry {
  city: string;
  country: string;
  coords: LatLng;
}

/** A fictional origin point for the simulated courier route. Not a real place. */
export const VIRTUAL_WAREHOUSE: LatLng = { lat: 50.5, lng: 4.5 };

export const KNOWN_CITIES: CityEntry[] = [
  { city: 'Lisbon', country: 'Portugal', coords: { lat: 38.7223, lng: -9.1393 } },
  { city: 'Porto', country: 'Portugal', coords: { lat: 41.1579, lng: -8.6291 } },
  { city: 'Madrid', country: 'Spain', coords: { lat: 40.4168, lng: -3.7038 } },
  { city: 'Barcelona', country: 'Spain', coords: { lat: 41.3874, lng: 2.1686 } },
  { city: 'Paris', country: 'France', coords: { lat: 48.8566, lng: 2.3522 } },
  { city: 'Berlin', country: 'Germany', coords: { lat: 52.52, lng: 13.405 } },
  { city: 'London', country: 'United Kingdom', coords: { lat: 51.5074, lng: -0.1278 } },
  { city: 'Warsaw', country: 'Poland', coords: { lat: 52.2297, lng: 21.0122 } },
  { city: 'Amsterdam', country: 'Netherlands', coords: { lat: 52.3676, lng: 4.9041 } },
  { city: 'Rome', country: 'Italy', coords: { lat: 41.9028, lng: 12.4964 } },
];

/** Country-level approximate centre, used when a typed city isn't mapped. */
export const COUNTRY_FALLBACK: Record<string, LatLng> = {
  Portugal: { lat: 39.5, lng: -8.0 },
  Spain: { lat: 40.0, lng: -3.7 },
  France: { lat: 46.6, lng: 2.4 },
  Germany: { lat: 51.0, lng: 10.4 },
  'United Kingdom': { lat: 54.0, lng: -2.4 },
  Poland: { lat: 52.0, lng: 19.4 },
  Netherlands: { lat: 52.2, lng: 5.3 },
  Italy: { lat: 42.8, lng: 12.6 },
};

/** Countries offered in the checkout selector (alphabetical). */
export const SUPPORTED_COUNTRIES: string[] = Object.keys(COUNTRY_FALLBACK).sort((a, b) =>
  a.localeCompare(b),
);

/** Known cities for a given country, for checkout suggestions. */
export function citiesForCountry(country: string): string[] {
  return KNOWN_CITIES.filter((c) => c.country === country).map((c) => c.city);
}

export type LocationLevel = 'city' | 'country' | 'none';

export interface ResolvedLocation {
  coords: LatLng | null;
  level: LocationLevel;
}

/**
 * Resolve a city/country pair to coordinates:
 * - exact known city → city-level coords
 * - otherwise a known country → country-level approximation
 * - otherwise none (order still allowed; map shows a fallback message)
 */
export function resolveLocation(city?: string, country?: string): ResolvedLocation {
  const cityTrim = city?.trim().toLowerCase();
  if (cityTrim) {
    const match = KNOWN_CITIES.find(
      (k) =>
        k.city.toLowerCase() === cityTrim && (!country || k.country === country),
    );
    if (match) return { coords: match.coords, level: 'city' };
  }
  if (country && COUNTRY_FALLBACK[country]) {
    return { coords: COUNTRY_FALLBACK[country], level: 'country' };
  }
  return { coords: null, level: 'none' };
}
