import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

function HotelsLayout() {
  return (
    <div className="w-full max-h-screen flex">
      <div className="w-[40%] mr-10">
        <Outlet />
      </div>
      <Map />
    </div>
  );
}

export default HotelsLayout;
