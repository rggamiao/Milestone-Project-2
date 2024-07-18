import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const position = [37.7749, -122.4194]; // Example position (San Francisco)

const Map = () => {
  return (
    <MapContainer center={position} zoom={5} style={{ height: '500px', width: '100%', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A sample marker popup.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
