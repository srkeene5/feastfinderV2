import React, { useEffect, useState } from 'react';
import { View } from 'react-native'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import { fromAddress, setKey } from "react-geocode"
import { Restaurant } from '../CoreComponents/CoreTypes.tsx';

// Import your custom marker images
import userMarkerIcon from './user-marker.png'; // Replace with the actual path to your custom icon
import diningHallMarkerIcon from './dining-hall-marker.png'; // Replace with the actual path to your custom icon
import { useLocation } from 'react-router-dom';

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

const MapComponent = ({}) => {
  const location = useLocation();
  const {restaurants = []} = location.state;
  const [restLocations, setRestLocations] = useState<{lat: number, lng: number, restaurant: Restaurant}[]>([]);

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
    GetRestLocations()
  }, []);

  //--------RestLocation Code--------
  const GetRestLocations = async () => {
    var newRestLocations = new Array<{lat: number, lng: number, restaurant: Restaurant}>
    setKey('AIzaSyARQ8j39qjYMPurDFGSvQPi04X2eISjNZM')

    for (const rest of restaurants) {
      try {
        //const response = await fromAddress(rest.restaurantAddress);
        //const {lat,lng} = response.result[0].geometry.location;
        //newRestLocations.push({lat, lng, restaurant: rest})
      } catch (error) {
        console.error("Geocoding error for restaurant: ", rest.restaurantAddress, error);
      }
    }

    setRestLocations(newRestLocations);
  }

  return (
    <View>
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

          {/* Dining Hall markers with custom icon, distance, and Google Maps link */}
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
          {restLocations.map((restLoc)=>(
            <Marker 
            key={restLoc.restaurant.restaurantID}
            position={[restLoc.lat, restLoc.lng]}
            icon={diningHallIcon}
            >
              <Popup>
                <strong>{restLoc.restaurant.restaurantName}</strong>
                <br />
                Distance: {haversineDistance(userLocation.lat, userLocation.lng, hall.lat, hall.lng)} km
                <br />
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
