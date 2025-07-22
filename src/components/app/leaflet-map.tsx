
'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { cn } from '@/lib/utils';

// Leaflet's default icons can sometimes have issues with bundlers like Webpack.
// This code manually sets the paths to the icon images to ensure they load correctly.
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// This is a client component that renders an interactive map.
// The default view is set to a central location (London, UK) as a placeholder.
// In a real application, you might use the user's location or event locations
// to set the initial view and markers.
export default function LeafletMap() {
  const position: L.LatLngExpression = [51.505, -0.09]; // Default to London

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      scrollWheelZoom={false} 
      className={cn("h-full w-full z-0")}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A sample location. <br /> More markers can be added here.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
