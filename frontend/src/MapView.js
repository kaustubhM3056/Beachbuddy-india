import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 🔥 FIX MARKER ICON BUG
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const icon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function MapView({ lat, lon, name }) {
  if (!lat || !lon) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        style={{
          height: "300px",
          width: "100%",
          borderRadius: "15px"
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lon]} icon={icon}>
          <Popup>{name}</Popup>
        </Marker>

      </MapContainer>
    </div>
  );
}

export default MapView;