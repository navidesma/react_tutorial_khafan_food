import React from "react";
import styles from "./MapComponent.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ setPosition }) => {
    useMapEvents({
        click(e) {
            if (!setPosition) return;

            setPosition(e.latlng);
        },
    });

    return null;
};

export const initialPosition = { lat: 35.69967758850624, lng: 51.337997205555446 };

export default function MapComponent({
  position,
  setPosition,
  width,
  height,
  lockedPosition,
}) {
  
  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        className={styles.container}
        style={{ width: width || undefined, height: height || undefined }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>لوکیشن شما</Popup>
        </Marker>
        <LocationMarker setPosition={lockedPosition ? undefined : setPosition} />
      </MapContainer>
    </>
  );
}
