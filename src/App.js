import "./styles.css";
import "leaflet/dist/leaflet.css";
import { TileLayer, MapContainer, Marker, Popup, CircleMarker, GeoJSON } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import { useEffect, useState } from "react";
import { addressPoints } from './addressPoints';
import { divIcon } from 'leaflet';
import getojson from './geojson.json';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const customIcon = divIcon({
  className: 'markerCustomIcon',
  html: '<div></div>',
  iconSize: [10, 10],
});

export default function App() {
  const [data, setData] = useState([]);
  const heatmapOptions = {
    radius: 15,
    blur: 15,
    maxZoom: 18,
    minOpacity: 1,
    maxOpacity: 1
  };

  const styleState = (feature) => ({
    fillColor: feature.properties.UF_05.startsWith('P') ? 'GREEN' : 'RED',
    weight: 1,
    opacity: 0.9,
    color: 'black',
    dashArray: '1',
    fillOpacity: 0.7,
  });

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
          <Marker position={[-10.579599, -37.34203]} icon={customIcon}>
            <Popup>
              Estou em Aracaju
            </Popup>
          </Marker>

          <Marker position={[-9.6647428, -35.7387426]}>
            <Popup>
              Estou em Maceió
            </Popup>
          </Marker>

          <CircleMarker center={[-7.8682068, -37.9747581]} color="black" radius={10}>
            <Popup>Estou em flores</Popup>
          </CircleMarker>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={getojson} style={styleState} />
        </MapContainer>
    </div>
  );
}
