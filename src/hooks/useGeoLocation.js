import { useState } from "react";

//  hook to get lat and long based on user location
function useGeoLocation() {
  const [geoPosition, setGeoPosition] = useState({});
  const [error, setError] = useState(null);
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);

  function getGeoPosition() {
    setIsLoadingPosition(true);
    if (!navigator.geolocation) {
      setError("your browser can not support your current location");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoadingPosition(false);
      },
      (err) => {
        setError(err.message);
        setIsLoadingPosition(false);
      }
    );
  }
  return { getGeoPosition, error, isLoadingPosition, geoPosition };
}

export default useGeoLocation;
