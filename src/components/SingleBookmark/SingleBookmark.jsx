import { useEffect } from "react";
import useBookmark from "../../hooks/useBookmark";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { getCurrentBookmark, isLoading, currentBookmark } = useBookmark();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getCurrentBookmark(id);
  }, [id]);

  if (isLoading) return <Loading />;

  if (!currentBookmark)
    return (
      <p className="text-center text-gray-500 mt-20 text-lg font-medium">
        😢 No bookmark found!
      </p>
    );

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-3xl shadow-2xl space-y-8">
      {/* 🏙 نام و کشور */}
      <div className="flex items-center justify-between ">
        <div className="text-4xl flex">
          <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
          <h2 className="text-3xl font-bold ml-2">{currentBookmark.city}</h2>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-gray-400 hover:bg-red-600 transition-colors rounded-full flex items-center justify-center shadow-md cursor-pointer"
        >
          <ChevronLeftIcon className="text-white w-6 h-6" />
        </button>
      </div>
      <div className="text-gray-500 italic text-sm flex justify-between my-5">
        <span>{currentBookmark.country}</span>
        <span>{currentBookmark.province}</span>
        <span>{currentBookmark.district}</span>
      </div>

      {/* 📍 مختصات و تایم‌زون */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl shadow-inner text-sm font-medium">
        <p>
          Latitude:{" "}
          <span className="font-semibold">
            {String(currentBookmark.latitude).slice(0, 10)}
          </span>
        </p>
        <p>
          Longitude:{" "}
          <span className="font-semibold">
            {String(currentBookmark.longitude).slice(0, 10)}
          </span>
        </p>
        <p>
          Timezone:{" "}
          <span className="font-semibold">{currentBookmark.timezone}</span>
        </p>
      </div>

      {/* 🌍 قاره و کدها */}
      <div className="grid grid-cols-2 gap-6 text-sm font-medium">
        <p>
          Continent:{" "}
          <span className="text-gray-700">{currentBookmark.continent}</span>
        </p>
        <p>
          Province Code:{" "}
          <span className="text-gray-700">{currentBookmark.provinceCode}</span>
        </p>
        <p>
          County:{" "}
          <span className="text-gray-700">{currentBookmark.county}</span>
        </p>
        <p>
          Lookup Source:{" "}
          <span className="text-gray-700">{currentBookmark.lookupSource}</span>
        </p>
      </div>

      {/* ➕ PlusCode و Locality Language */}
      <div className="grid grid-cols-2 gap-6 text-sm font-medium">
        {currentBookmark.plusCode && (
          <p>
            Plus Code:{" "}
            <span className="text-gray-700">{currentBookmark.plusCode}</span>
          </p>
        )}
        <p>
          Language Requested:{" "}
          <span className="text-gray-700">
            {currentBookmark.localityLanguageRequested}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SingleBookmark;
