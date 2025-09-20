import { Link } from "react-router-dom";
import useBookmark from "../../hooks/useBookmark";
import ReactCountryFlag from "react-country-flag";

function Bookmark() {
  const { bookmarks, currentBookmark } = useBookmark();

  return (
    <div className="w-full h-[700px] p-6 overflow-auto">
      <h1 className="text-3xl font-bold mb-8 text-indigo-600 border-b pb-2">
        📌 Bookmark List
      </h1>

      <div className="flex flex-col gap-3">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`border-2 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  currentBookmark?.id === item.id
                    ? "border-red-200 hover:border-red-400 bg-red-50"
                    : "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50"
                }`}
              >
                {/* country flag */}
                <div className="w-8 h-8 flex items-center justify-center text-2xl">
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                </div>

                {/* city + country */}
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-800">{item.city}</span>
                  <span className="text-sm text-gray-500">{item.country}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
