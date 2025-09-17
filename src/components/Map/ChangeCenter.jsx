import { useEffect } from "react";
import { useMap } from "react-leaflet";

function ChangeCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom(), { duration: 3 });
    }
  }, [position, map]);

  return null;
}

export default ChangeCenter;
