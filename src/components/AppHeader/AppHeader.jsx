import {
  CalendarIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import GuestsOptionList from "./GuestsoptionList";

function AppHeader() {
  const [destination, setDestination] = useState();
  const [openOption, setOpenOption] = useState(false);
  const [option, setOption] = useState({ adult: 1, children: 0, rooms: 1 });

  const handleOption = (type, action) =>
    setOption((prev) => ({
      ...prev,
      [type]: action === "dec" ? prev[type] - 1 : prev[type] + 1,
    }));

  return (
    <div className="flex items-center justify-between mt-6 px-6">
      {/* Logo / Home */}
      <button className="text-xl font-semibold text-gray-700 hover:text-red-500 transition cursor-pointer">
        MyBooking
      </button>

      {/* Search bar & function to get location data from user */}
      <div className="flex items-center flex-1 max-w-5xl border border-gray-200 rounded-full shadow-lg py-3 px-6 gap-x-6 bg-white">
        {/* Location */}
        <div className="flex items-center gap-x-2 flex-1 border-r pr-4">
          <MapPinIcon className="w-9 h-9 text-red-500" />
          <input
            type="text"
            placeholder="Where to?"
            className="w-full outline-none placeholder-gray-400 text-sm"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {/* Days */}
        <div className="flex items-center gap-x-2 flex-1 border-r pr-4">
          <CalendarIcon className="w-9 h-9 text-purple-500" />
          <input
            type="text"
            placeholder="Add dates"
            className="w-full outline-none placeholder-gray-400 text-sm"
          />
        </div>

        {/* Guests & function to open/close option component*/}
        <div
          onClick={() => setOpenOption(!openOption)}
          className="flex items-center justify-between gap-x-2 flex-1 relative"
        >
          <UsersIcon className="w-9 h-9 text-fuchsia-500 cursor-pointer" />
          <div
            type="text"
            className="w-full outline-none placeholder-gray-400 text-sm"
          >
            {option.adult} Adualt . {option.children} Children . {option.rooms}
            Room
          </div>
          {openOption && (
            <GuestsOptionList handleOption={handleOption} option={option} />
          )}
        </div>

        {/* Search button */}
        <button className="flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full w-12 h-12 shadow-md transition duration-300 cursor-pointer">
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default AppHeader;
