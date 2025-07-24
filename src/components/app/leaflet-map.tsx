
'use client';

// This component is currently not in use.
// It has been temporarily replaced with a placeholder in the UI
// to stabilize the application. The persistent error "Map container is already initialized"
// needs to be resolved before this component can be safely re-integrated.
// See the new `TODO.md` file for a detailed technical brief on this issue.

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

export default function LeafletMap() {
    return (
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-center p-4">
           <div>
             <p className="text-sm font-semibold text-destructive">Map Temporarily Unavailable</p>
             <p className="text-xs text-muted-foreground">Our interactive map is currently undergoing maintenance. Please check back soon.</p>
           </div>
        </div>
    );
}
