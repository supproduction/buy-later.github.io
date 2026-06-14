import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import type { LatLng } from '../../data/locations';

const CITY_ICON = L.divIcon({
  html: '<div style="font-size:22px;line-height:1;filter:drop-shadow(0 1px 2px rgba(0,0,0,.35))">📍</div>',
  className: 'bl-emoji-marker',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

function Recenter({ coords }: { coords: LatLng }) {
  const map = useMap();
  useEffect(() => {
    map.setView([coords.lat, coords.lng], 6);
  }, [map, coords.lat, coords.lng]);
  return null;
}

/** A small single-marker map. Used for the (simulated) seller city. */
export default function CityMap({ coords, label }: { coords: LatLng; label: string }) {
  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-ink-100">
      <MapContainer
        className="h-56 w-full"
        center={[coords.lat, coords.lng]}
        zoom={6}
        scrollWheelZoom={false}
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Recenter coords={coords} />
        <Marker position={[coords.lat, coords.lng]} icon={CITY_ICON}>
          <Tooltip permanent direction="top">
            {label}
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
}
