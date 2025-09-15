import { useContext } from "react";
import HotelContext from "../context/hotelContext/hotelContext";

function useHotels() {
  return useContext(HotelContext);
}
export default useHotels;
