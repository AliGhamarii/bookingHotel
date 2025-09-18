import { useEffect } from "react";
import useBookmark from "../../hooks/useBookmark";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { getCurrentBookmark, isLoadingCurrBookmark, currentBookmark } =
    useBookmark();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getCurrentBookmark(id);
  }, [id]);

  if (isLoadingCurrBookmark) return <Loading />;

  if (!currentBookmark)
    return (
      <p className="text-center text-gray-500 mt-20 text-lg font-medium">
        😢 No bookmark found!
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-2xl space-y-8">
      {/* 🏙 نام و کشور */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <span className="text-4xl">
            <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
          </span>
          <div>
            <h2 className="text-3xl font-bold">{currentBookmark.cityName}</h2>
            <p className="text-gray-500 italic text-sm">
              {currentBookmark.host_location}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-gray-400 hover:bg-red-600 transition-colors rounded-full flex items-center justify-center shadow-md cursor-pointer"
        >
          <ChevronLeftIcon className="text-white w-6 h-6" />
        </button>
      </div>

      {/* 📍 مختصات و ارتفاع */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50 p-6 rounded-xl shadow-inner text-sm font-medium">
        <p>
          Latitude:{" "}
          <span className="font-semibold">
            {currentBookmark.latitude.slice(0, 10)}
          </span>
        </p>
        <p>
          Longitude:{" "}
          <span className="font-semibold">
            {currentBookmark.longitude.slice(0, 10)}
          </span>
        </p>
        <p>
          Elevation:{" "}
          <span className="font-semibold">{currentBookmark.elevation} m</span>
        </p>
        <p>
          Timezone:{" "}
          <span className="font-semibold">{currentBookmark.timezone}</span>
        </p>
      </div>

      {/* 👥 جمعیت و مساحت */}
      <div className="grid grid-cols-2 gap-6 text-sm font-medium">
        <p>
          Population:{" "}
          <span className="text-gray-700">
            {currentBookmark.population.toLocaleString()}
          </span>
        </p>
        <p>
          Area:{" "}
          <span className="text-gray-700">{currentBookmark.area} km²</span>
        </p>
      </div>

      {/* 🌦 آب و هوا */}
      <div className="bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 p-6 rounded-2xl text-sm shadow-md">
        <h3 className="font-semibold mb-3 text-blue-800 text-lg">Weather 🌤</h3>
        <p>
          🌡 Avg Temp:{" "}
          <span className="font-medium">
            {currentBookmark.weather.averageTempC}°C
          </span>
        </p>
        <p>
          ☔ Rainfall:{" "}
          <span className="font-medium">
            {currentBookmark.weather.rainfallMmPerYear} mm/year
          </span>
        </p>
        <p>
          🌍 Conditions:{" "}
          <span className="font-medium">
            {currentBookmark.weather.conditions}
          </span>
        </p>
      </div>

      {/* 🗣 زبان و 💰 ارز */}
      <div className="grid grid-cols-2 gap-6 text-sm font-medium">
        <p>
          Language:{" "}
          <span className="text-gray-700">
            {currentBookmark.officialLanguage}
          </span>
        </p>
        <p>
          Currency:{" "}
          <span className="text-gray-700">{currentBookmark.currency}</span>
        </p>
      </div>

      {/* 🏛 مکان معروف */}
      <div className="text-sm font-medium">
        Landmark:{" "}
        <span className="text-gray-700">{currentBookmark.landmark}</span>
      </div>

      {/* 🏘 شهرهای همسایه */}
      <div className="text-sm font-medium">
        <h3 className="mb-2 font-semibold">Nearby Cities 🏘</h3>
        <ul className="list-disc list-inside space-y-1">
          {currentBookmark.neighboringCities?.map((city, index) => (
            <li key={index}>
              {city.name}{" "}
              <span className="text-gray-400">({city.distanceKm} km)</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SingleBookmark;
