import HotelContext from "./hotelContext";
import { useSearchParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import axios from "axios";
import { useState } from "react";

// global
const baseUrl = "http://localhost:5000/hotels";

function HotelProvider({ children }) {
  const [searchParams] = useSearchParams();
  const [errorCurrentHottel, setErrorCurrentHottel] = useState();
  const [isLoadingCurrentHottel, setIsLoadingCurrentHottel] = useState(false);
  const [currentHottel, setCurrentHottel] = useState(null);

  // get query data from url.
  const destination = searchParams.get("destination");
  const rooms = JSON.parse(searchParams.get("option"))?.rooms;

  // get data from backend.
  const { isLoading, data: hotels } = useFetchData(
    baseUrl,
    `q=${destination || " "}&accommodates_gte=${rooms || 1}`
  );

  // set current hottel
  async function getCurrentHottel(id) {
    try {
      setIsLoadingCurrentHottel(true);
      const { data } = await axios.get(`${baseUrl}/${id}`);
      setCurrentHottel(data);
    } catch (err) {
      setErrorCurrentHottel(err);
    } finally {
      setIsLoadingCurrentHottel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        hotels,
        isLoading,
        currentHottel,
        getCurrentHottel,
        errorCurrentHottel,
        isLoadingCurrentHottel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelProvider;
