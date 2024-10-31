import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is imported
import 'leaflet-defaulticon-compatibility'; // To fix default icon issues

import { Restaurant } from '../CoreComponents/CoreTypes.tsx';
import { GAPIKEY } from '../../../config.js'; // Ensure this path is correct

// Import your custom marker images
import userMarkerIcon from './user-marker.png';
import diningHallMarkerIcon from './dining-hall-marker.png';
import restaurantMarkerIcon from './restaurant-marker.png';

// Purdue Dining Halls Coordinates with Google Maps links
const diningHalls = [
  {
    name: 'Earhart Dining Court',
    lat: 40.4260,
    lng: -86.9256,
    mapUrl: 'https://www.google.com/maps/place/Earhart+Dining+Court/@40.428521,-86.9233984,17z/data=!4m6!3m5!1s0x8812fddb980c7891:0xbe31985e92758c5a!8m2!3d40.4256067!4d-86.9251082!16s%2Fg%2F12vr2tmsl?entry=ttu&g_ep=EgoyMDI0MTAwMS4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'Ford Dining Court',
    lat: 40.4310,
    lng: -86.9200,
    mapUrl: 'https://www.google.com/maps/place/Ford+Dining+Court/@40.4321089,-86.9221323,17z/data=!3m1!4b1!4m6!3m5!1s0x8812fd4b26db4177:0x2f3f9ae6b45d3924!8m2!3d40.4321089!4d-86.9195574!16s%2Fg%2F11cm0v2m66?entry=ttu&g_ep=EgoyMDI0MTAwMS4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'Hillenbrand Dining Court',
    lat: 40.4241,
    lng: -86.9216,
    mapUrl: 'https://www.google.com/maps/place/Hillenbrand+Hall/@40.4268796,-86.9290093,17z/data=!3m1!4b1!4m6!3m5!1s0x8812e2cbef4e9ea1:0x17e067f172517513!8m2!3d40.4268796!4d-86.9264344!16s%2Fg%2F11g7np5zwf?entry=ttu&g_ep=EgoyMDI0MTAwMS4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'Wiley Dining Court',
    lat: 40.4245,
    lng: -86.9265,
    mapUrl: 'https://www.google.com/maps/place/Wiley+Dining+Court/@40.428521,-86.9233984,17z/data=!3m1!4b1!4m6!3m5!1s0x8812e2b15807a209:0x561f5eb85d8c5a66!8m2!3d40.428521!4d-86.9208235!16s%2Fg%2F1hc7sgkq7?entry=ttu&g_ep=EgoyMDI0MTAwMS4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'Windsor Dining Court',
    lat: 40.4274,
    lng: -86.9171,
    mapUrl: 'https://www.google.com/maps/place/Windsor+Dining+Court/@40.4270434,-86.923636,17z/data=!3m1!4b1!4m6!3m5!1s0x8812e2b5c166c8cb:0xc6b89b5c96b567c4!8m2!3d40.4270434!4d-86.9210611!16s%2Fg%2F11c6v55pmb?entry=ttu&g_ep=EgoyMDI0MTAwMS4wIKXMDSoASAFQAw%3D%3D',
  },
];

// Custom icon for user's location
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

// Custom icon for restaurants
const restaurantIcon = new L.Icon({
  iconUrl: restaurantMarkerIcon,
  iconSize: [35, 45],
  iconAnchor: [17, 42],
  popupAnchor: [0, -40],
});

// Helper to calculate straight-line distance between two coordinates
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2); // Distance in kilometers (rounded to 2 decimals)
};

// Helper component to move the map's view to user's location
const MapUpdater = ({ location }: { location: { lat: number; lng: number } }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 14); // Zoom into user location
    }
  }, [location, map]);
  return null;
};

// New function to get coordinates
const getCoordinates = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GAPIKEY}`
    );
    const data = await response.json();
    if (data.status === "OK" && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      console.error("Geocoding error:", data.status);
      return null;
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};

const MapComponent: React.FC<{ restaurants: Restaurant[] }> = ({ restaurants }) => {
  const [restLocations, setRestLocations] = useState<{ lat: number; lng: number; restaurant: Restaurant }[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch restaurant locations
  const GetRestLocations = useCallback(async () => {
    const newRestLocations: { lat: number; lng: number; restaurant: Restaurant }[] = [];
    for (const rest of restaurants) {
      const coordinates = await getCoordinates(rest.restaurantAddress);
      if (coordinates) {
        newRestLocations.push({ lat: coordinates.lat, lng: coordinates.lng, restaurant: rest });
      }
    }
    setRestLocations(newRestLocations);
  }, [restaurants]);

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
    GetRestLocations();
  }, [restaurants, GetRestLocations]);

  return (
    <View style={{ flex: 1 }}>
      {error && <p>{error}</p>}
      {userLocation ? (
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={14}
          style={{ flex: 1, width: '100%' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <MapUpdater location={userLocation} />
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>

          {diningHalls.map((hall) => (
            <Marker key={hall.name} position={[hall.lat, hall.lng]} icon={diningHallIcon}>
              <Popup>
                <strong>{hall.name}</strong>
                <br />
                Distance: {haversineDistance(userLocation.lat, userLocation.lng, hall.lat, hall.lng)} km
                <br />
                <a href={hall.mapUrl} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </Popup>
            </Marker>
          ))}

          {restLocations.map((restLoc) => (
            <Marker
              key={restLoc.restaurant.restaurantID}
              position={[restLoc.lat, restLoc.lng]}
              icon={restaurantIcon}
            >
              <Popup>
                <strong>{restLoc.restaurant.restaurantName}</strong>
                <br />
                Distance: {haversineDistance(userLocation.lat, userLocation.lng, restLoc.lat, restLoc.lng)} km
                <br />
                Address: {restLoc.restaurant.restaurantAddress}
                <br />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restLoc.restaurant.restaurantAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Loading location...</p>
      )}
    </View>
  );
};

export default MapComponent;
