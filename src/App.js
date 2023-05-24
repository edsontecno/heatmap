import "./styles.css";
import "leaflet/dist/leaflet.css";
import { TileLayer, MapContainer } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import { useEffect, useState } from "react";
import { addressPoints } from './addressPoints';

export default function App() {
  const [data, setData] = useState([]);
  const heatmapOptions = {
    radius: 15,
    blur: 15,
    maxZoom: 18,
    minOpacity: 1,
    maxOpacity: 1
  };

  useEffect(() => {
    setData(addressPoints);
  }, [data]);

  return (
    <div className="rootContainer">
        <MapContainer
          center={[-12.74, -56.33]}
          zoom={4}
          key={Math.random()}
        >
          <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={data}
            longitudeExtractor={(point) => point[1]}
            latitudeExtractor={(point) => point[0]}
            key={Math.random() + Math.random()}
            intensityExtractor={(point) => 0}
            {...heatmapOptions}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
    </div>
  );
}
