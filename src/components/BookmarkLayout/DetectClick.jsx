import { useMapEvent } from "react-leaflet";
import { useNavigate } from "react-router-dom";

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent("click", (e) => {
    navigate(`/bookmark?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  });

  return null;
}

export default DetectClick;
