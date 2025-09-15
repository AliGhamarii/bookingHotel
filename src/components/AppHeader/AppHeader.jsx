import {
  CalendarIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import GuestsOptionList from "./GuestsoptionList";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { createSearchParams, useNavigate } from "react-router-dom";

function AppHeader() {
  //hooks
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const [option, setOption] = useState({ adult: 1, children: 0, rooms: 1 });
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // functions.
  // set a new object for Guests component
  const handleOption = (type, action) =>
    setOption((prev) => ({
      ...prev,
      [type]: action === "dec" ? prev[type] - 1 : prev[type] + 1,
    }));

  // function to route
  const navigate = useNavigate();

  // navigate to route /hotels & send all dataes in appHeader with navigate function.
  const handleSearch = () => {
    // object to string
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      option: JSON.stringify(option),
    });
    // setSearchParams(encodedParams);
    navigate({ pathname: "/hotels", search: encodedParams.toString() });
  };

  // jsx
  return (
    <div className="flex items-center justify-between mb-10">
      {/* Logo / Home */}
      <button
        onClick={() => navigate("/")}
        className="text-3xl font-bold text-gray-700 hover:text-red-500 transition cursor-pointer"
      >
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
            className="w-full outline-none text-base font-medium text-gray-700 placeholder-gray-400 focus:text-red-600 focus:placeholder-red-400 transition"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {/* Date */}
        <div className="flex items-center gap-x-2 flex-1 border-r pr-4 relative cursor-pointer">
          <CalendarIcon className="w-9 h-9 text-blue-500" />
          <div
            onClick={() => setOpenDate(!openDate)}
            type="text"
            placeholder="Add dates"
            className="w-full outline-none placeholder-gray-400 text-sm"
          >
            <span className="w-full text-base font-medium text-blue-700 tracking-wide">
              {`${format(date[0].startDate, "MMM dd")} - ${format(
                date[0].endDate,
                "MMM dd"
              )}`}
            </span>
          </div>
          <div className="absolute top-10 right-0 shadow">
            {openDate && (
              <DateRange
                ranges={date}
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                moveRangeOnFirstSelection={true}
              />
            )}
          </div>
        </div>

        {/* Guests & function to open/close option component*/}
        <div
          onClick={() => setOpenOption(!openOption)}
          className="flex items-center justify-between gap-x-2 flex-1 relative"
          id="guestId"
        >
          <UsersIcon className="w-9 h-9 text-fuchsia-500 cursor-pointer" />
          <span className="w-full text-base font-semibold text-fuchsia-600 cursor-pointer">
            {option.adult} Adult • {option.children} Children • {option.rooms}{" "}
            Room
          </span>

          {openOption && (
            <GuestsOptionList
              handleOption={handleOption}
              option={option}
              setOpenOption={setOpenOption}
            />
          )}
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-full w-12 h-12 shadow-md transition duration-300 cursor-pointer"
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default AppHeader;
