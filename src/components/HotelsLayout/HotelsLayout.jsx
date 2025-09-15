import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

function HotelsLayout() {
  return (
    <div className="w-full min-h-screen flex">
      <div className="w-1/2">
        <Outlet />
      </div>
      <Map />
    </div>
  );
}

export default HotelsLayout;
