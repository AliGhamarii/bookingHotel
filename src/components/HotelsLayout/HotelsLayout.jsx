import { Outlet } from "react-router-dom";

function HotelsLayout() {
  return (
    <div className="w-full min-h-screen flex">
      <div className="w-1/2">
        <Outlet />
      </div>
      <div className="w-1/2">map</div>
    </div>
  );
}

export default HotelsLayout;
