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
    <div className="w-full h-[700px] max-w-4xl mx-auto p-10 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl flex flex-col">
      {/* 🔝 هدر */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ReactCountryFlag
            svg
            countryCode={currentBookmark.countryCode}
            className="text-4xl"
          />
          <h2 className="text-3xl font-extrabold text-gray-800">
            {currentBookmark.city}
          </h2>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-gray-400 hover:bg-red-600 transition-colors rounded-full flex items-center justify-center shadow-md cursor-pointer"
        >
          <ChevronLeftIcon className="text-white w-6 h-6" />
        </button>
      </div>

      {/* 🌍 لوکیشن بالا */}
      <div className="text-gray-600 italic text-sm flex-wrap gap-6 border-b pb-4 flex flex-col">
        <div>🌎 country : {currentBookmark.country}</div>
        <div>🏞 province : {currentBookmark.province}</div>
        <div>🏘 district : {currentBookmark.district}</div>
      </div>

      {/* 📌 بخش وسط → پرکننده اصلی */}
      <div className="flex-grow flex flex-col justify-center gap-6 ">
        {/* 📍 مختصات */}
        <div className="rounded-xl text-base font-medium space-y-10">
          <p>
            Latitude:{" "}
            <span className="font-semibold text-gray-800">
              {String(currentBookmark.latitude).slice(0, 10)}
            </span>
          </p>
          <p>
            Longitude:{" "}
            <span className="font-semibold text-gray-800">
              {String(currentBookmark.longitude).slice(0, 10)}
            </span>
          </p>
          <p>
            Timezone:{" "}
            <span className="font-semibold text-gray-800">
              {currentBookmark.timezone}
            </span>
          </p>
        </div>

        {/* 🌍 قاره و کدها */}
        <div className="flex flex-col gap-6 text-base font-medium">
          <p>
            🌐 Continent:{" "}
            <span className="text-gray-700">{currentBookmark.continent}</span>
          </p>
          <p>
            🏷 Province Code:{" "}
            <span className="text-gray-700">
              {currentBookmark.provinceCode}
            </span>
          </p>
          <p>
            🗺 Country:{" "}
            <span className="text-gray-700">{currentBookmark.country}</span>
          </p>
          <p>
            🔎 Lookup Source:{" "}
            <span className="text-gray-700">
              {currentBookmark.lookupSource}
            </span>
          </p>
        </div>
      </div>

      {/* 🔚 بخش پایینی → کد و زبان */}
      <div className="grid grid-cols-2 gap-6 text-sm font-medium border-t pt-4">
        {currentBookmark.plusCode && (
          <p>
            ➕ Plus Code:{" "}
            <span className="text-gray-800">{currentBookmark.plusCode}</span>
          </p>
        )}
        <p>
          🗣 Language Requested:{" "}
          <span className="text-gray-800">
            {currentBookmark.localityLanguageRequested}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SingleBookmark;
