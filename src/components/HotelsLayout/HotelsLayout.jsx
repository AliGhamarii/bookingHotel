import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import useHotels from "../../hooks/useHotels";

function HotelsLayout() {
  const { hotels } = useHotels();
  return (
    <div className="w-full max-h-screen flex">
      <div className="w-[40%] mr-10">
        <Outlet />
      </div>
      <Map markerLocation={hotels} />
    </div>
  );
}

export default HotelsLayout;
