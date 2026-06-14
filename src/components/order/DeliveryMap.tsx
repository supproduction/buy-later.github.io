import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from 'react-leaflet';
import type { VirtualOrder } from '../../types/order';
import { statusIndex } from '../../lib/order';
import { resolveLocation, VIRTUAL_WAREHOUSE, type LatLng } from '../../data/locations';
import { useTranslation } from '../../i18n';

const DELIVERED_INDEX = statusIndex('virtually_delivered');

/** Build a playful emoji marker so we never rely on Leaflet's default icon assets. */
function emojiIcon(emoji: string) {
  return L.divIcon({
    html: `<div style="font-size:22px;line-height:1;filter:drop-shadow(0 1px 2px rgba(0,0,0,.35))">${emoji}</div>`,
    className: 'bl-emoji-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

const WAREHOUSE_ICON = emojiIcon('🏭');
const CITY_ICON = emojiIcon('📍');
const COURIER_ICON = emojiIcon('🚚');

function lerp(a: LatLng, b: LatLng, f: number): LatLng {
  return { lat: a.lat + (b.lat - a.lat) * f, lng: a.lng + (b.lng - a.lng) * f };
}

/** Fits the map to show both endpoints whenever they change. */
function FitBounds({ a, b }: { a: LatLng; b: LatLng }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds([a.lat, a.lng], [b.lat, b.lng]);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 7 });
  }, [map, a.lat, a.lng, b.lat, b.lng]);
  return null;
}

/**
 * Simulated courier route from a fictional warehouse to the chosen city.
 * The courier marker advances along the route based on the (time-derived)
 * order status. Everything is clearly labelled as a simulation.
 */
export default function DeliveryMap({ order }: { order: VirtualOrder }) {
  const { t } = useTranslation();
  const { coords } = resolveLocation(order.deliveryCity, order.deliveryCountry);
  if (!coords) return null;

  const fraction = Math.max(0, Math.min(1, statusIndex(order.currentStatus) / DELIVERED_INDEX));
  const courier = lerp(VIRTUAL_WAREHOUSE, coords, fraction);

  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-ink-100">
      <MapContainer
        className="h-64 w-full"
        bounds={L.latLngBounds(
          [VIRTUAL_WAREHOUSE.lat, VIRTUAL_WAREHOUSE.lng],
          [coords.lat, coords.lng],
        )}
        scrollWheelZoom={false}
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds a={VIRTUAL_WAREHOUSE} b={coords} />

        <Polyline
          positions={[
            [VIRTUAL_WAREHOUSE.lat, VIRTUAL_WAREHOUSE.lng],
            [coords.lat, coords.lng],
          ]}
          pathOptions={{ color: '#1fa489', weight: 3, dashArray: '6 8' }}
        />

        <Marker position={[VIRTUAL_WAREHOUSE.lat, VIRTUAL_WAREHOUSE.lng]} icon={WAREHOUSE_ICON}>
          <Tooltip permanent direction="top">{t('orderDetail.mapWarehouse')}</Tooltip>
        </Marker>
        <Marker position={[coords.lat, coords.lng]} icon={CITY_ICON}>
          <Tooltip permanent direction="top">{t('orderDetail.mapCity')}</Tooltip>
        </Marker>
        <Marker position={[courier.lat, courier.lng]} icon={COURIER_ICON}>
          <Tooltip direction="top">{t('orderDetail.mapCourier')}</Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
}
