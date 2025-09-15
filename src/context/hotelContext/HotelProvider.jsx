import HotelContext from "./hotelContext";
import { useSearchParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

function HotelProvider({ children }) {
  const [searchParams] = useSearchParams();

  // get query data from url.
  const destination = searchParams.get("destination");
  const rooms = JSON.parse(searchParams.get("option"))?.rooms;

  // get data from backend.
  const { isLoading, data: hotels } = useFetchData(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${rooms || 1}`
  );
  return (
    <HotelContext.Provider value={{ hotels, isLoading }}>
      {children}
    </HotelContext.Provider>
  );
}

export default HotelProvider;
