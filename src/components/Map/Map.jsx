import { useEffect, useState } from "react";
import useHotels from "../../hooks/useHotels";
import Loading from "../Loading/Loading";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSearchParams } from "react-router-dom";
import ChangeCenter from "./ChangeCenter";
import useGeoLocation from "../../hooks/useGeoLocation";

function Map() {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const { hotels, isLoading } = useHotels();
  const [searchParams] = useSearchParams();
  const { getGeoPosition, isLoadingPosition, geoPosition, error } =
    useGeoLocation();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const isSingleHotel = lat && lng;

  useEffect(() => {
    if (lat && lng) setMapCenter([Number(lat), Number(lng)]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition?.lat && geoPosition?.lng)
      setMapCenter([Number(geoPosition.lat), Number(geoPosition.lng)]);
  }, [geoPosition]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-[60%] min-h-screen">
      <MapContainer
        center={mapCenter}
        zoom={isSingleHotel ? 15 : 4}
        scrollWheelZoom={true}
        className="h-[700px] w-full rounded-lg shadow"
      >
        <button
          onClick={getGeoPosition}
          className="bg-blue-950 text-white absolute bottom-4 left-2 px-3 py-1 cursor-pointer rounded-lg z-1000"
        >
          {isLoadingPosition ? "Loading..." : "Use your location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />

        {hotels.map((hotel) => (
          <Marker key={hotel.id} position={[hotel.latitude, hotel.longitude]}>
            <Popup>{hotel.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}

export default Map;
