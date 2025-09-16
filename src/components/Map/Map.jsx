import { useState } from "react";
import useHotels from "../../hooks/useHotels";
import Loading from "../Loading/Loading";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSearchParams } from "react-router-dom";

function Map() {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const { hotels, isLoading } = useHotels();
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lat");

  if (isLoading) return <Loading />;

  return (
    <div className="w-2/3 min-h-screen">
      <MapContainer
        center={mapCenter}
        zoom={4}
        scrollWheelZoom={true}
        className="h-[650px] w-full rounded-lg shadow"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hotels.map((hotel) => (
          <Marker key={hotel.id} position={[hotel.latitude, hotel.longitude]}>
            <Popup>{hotel.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
