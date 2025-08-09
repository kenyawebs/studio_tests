
'use client';

import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertTriangle } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
};

// A default center, e.g., Nairobi, KE. Can be changed.
const center = {
  lat: -1.286389,
  lng: 36.817223
};

// Example markers. In a real app, these would come from props.
const markers = [
  { lat: -1.286389, lng: 36.817223, title: 'Community Networking Night' },
  { lat: -1.292066, lng: 36.821945, title: 'Community Food Drive' },
  { lat: -1.28325, lng: 36.81667, title: 'Weekend Growth Seminar' }
];

export default function GoogleMapWrapper() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey.includes("your-") || apiKey.includes("dummy")) {
    return (
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Google Maps API Key Missing</AlertTitle>
            <AlertDescription>
            The Google Maps API key is not configured. Please add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to your `.env.local` file.
            </AlertDescription>
        </Alert>
    );
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(mapInstance: google.maps.Map) {
    mapInstance.setCenter(center);
    mapInstance.setZoom(12);
    setMap(mapInstance);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {markers.map((marker, index) => (
        <MarkerF key={index} position={{ lat: marker.lat, lng: marker.lng }} title={marker.title} />
      ))}
    </GoogleMap>
  );
}
