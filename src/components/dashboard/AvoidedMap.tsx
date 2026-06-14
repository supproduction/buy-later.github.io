import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import type { VirtualOrder } from '../../types/order';
import { flagFor, sellerCityFor } from '../../lib/community';
import type { LatLng } from '../../data/locations';
import { useTranslation } from '../../i18n';

interface CityPoint {
  city: string;
  country: string;
  coords: LatLng;
  count: number;
  saved: number;
}

/** Aggregate avoided orders by (illustrative) seller city. */
function aggregate(orders: VirtualOrder[]): CityPoint[] {
  const byCity = new Map<string, CityPoint>();
  for (const order of orders) {
    for (const item of order.items) {
      const c = sellerCityFor(item.product.id);
      const cur =
        byCity.get(c.city) ??
        ({ city: c.city, country: c.country, coords: c.coords, count: 0, saved: 0 } as CityPoint);
      cur.count += item.quantity;
      cur.saved += item.product.price * item.quantity;
      byCity.set(c.city, cur);
    }
  }
  return [...byCity.values()];
}

function countIcon(count: number) {
  return L.divIcon({
    html: `<div style="display:grid;place-items:center;min-width:24px;height:24px;padding:0 6px;border-radius:9999px;background:#138370;color:#fff;font:600 12px/1 ui-sans-serif,system-ui;box-shadow:0 1px 3px rgba(0,0,0,.35)">${count}</div>`,
    className: 'bl-count-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function FitBounds({ points }: { points: CityPoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView([points[0].coords.lat, points[0].coords.lng], 5);
      return;
    }
    const bounds = L.latLngBounds(points.map((p) => [p.coords.lat, p.coords.lng]));
    map.fitBounds(bounds, { padding: [36, 36], maxZoom: 6 });
  }, [map, points]);
  return null;
}

/** Dashboard map: where the items you avoided "ship from" (illustrative). */
export default function AvoidedMap({ orders }: { orders: VirtualOrder[] }) {
  const { t, formatCurrency } = useTranslation();
  const points = useMemo(() => aggregate(orders), [orders]);
  if (points.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-ink-100">
      <MapContainer
        className="h-64 w-full"
        center={[points[0].coords.lat, points[0].coords.lng]}
        zoom={5}
        scrollWheelZoom={false}
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        {points.map((p) => (
          <Marker key={p.city} position={[p.coords.lat, p.coords.lng]} icon={countIcon(p.count)}>
            <Tooltip direction="top">
              {flagFor(p.country)} {p.city} · {formatCurrency(p.saved)}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      <p className="px-1 pt-2 text-xs text-ink-400">{t('dashboard.avoidedMapNote')}</p>
    </div>
  );
}
