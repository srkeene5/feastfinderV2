import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

// Import your custom marker images
import userMarkerIcon from './user-marker.png'; // Replace with the actual path to your custom icon
import diningHallMarkerIcon from './dining-hall-marker.png'; // Replace with the actual path to your custom icon

// Purdue Dining Halls Coordinates
const diningHalls = [
  { name: 'Earhart Dining Court', lat: 40.4260, lng: -86.9256 },
  { name: 'Ford Dining Court', lat: 40.4310, lng: -86.9200 },
  { name: 'Hillenbrand Dining Court', lat: 40.4241, lng: -86.9216 },
  { name: 'Wiley Dining Court', lat: 40.4245, lng: -86.9265 },
  { name: 'Windsor Dining Court', lat: 40.4274, lng: -86.9171 },
];

// Custom icon for the user's location
const userIcon = new L.Icon({
  iconUrl: userMarkerIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 42],
  popupAnchor: [0, -40],
});

// Custom icon for dining halls
const diningHallIcon = new L.Icon({
  iconUrl: diningHallMarkerIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 42],
  popupAnchor: [0, -40],
});

// Haversine Formula to calculate straight-line distance between two lat/lng coordinates
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance.toFixed(2); // Return in kilometers (rounded to 2 decimals)
};

// Helper component to move the map's view to the user's location
const MapUpdater = ({ location }: { location: { lat: number; lng: number } }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 14); // Zoom into user location
    }
  }, [location, map]);
  return null;
};

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ height: '400px' }}>
      <h1>Map of Dining Halls and Your Location</h1>
      {error && <p>{error}</p>}
      {userLocation ? (
        <MapContainer
          center={[40.4259, -86.9196]} // Default center near Purdue
          zoom={14}
          style={{ height: '400px', width: '100%' }} // Map size
        >
          {/* Simplified Tile Layer (Carto Light) */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {/* Move the map to the user's location */}
          <MapUpdater location={userLocation} />

          {/* User location marker with custom icon */}
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>

          {/* Dining Hall markers with custom icon and distance calculation */}
          {diningHalls.map((hall) => (
            <Marker key={hall.name} position={[hall.lat, hall.lng]} icon={diningHallIcon}>
              <Popup>
                {hall.name}
                <br />
                Distance: {haversineDistance(userLocation.lat, userLocation.lng, hall.lat, hall.lng)} km
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default MapComponent;
