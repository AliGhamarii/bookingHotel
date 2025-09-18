import { Link } from "react-router-dom";
import useBookmark from "../../hooks/useBookmark";
import ReactCountryFlag from "react-country-flag";

function Bookmark() {
  const { bookmarks } = useBookmark();
  return (
    <div className="w-full h-[700px]">
      <h1 className="text-3xl mb-5">Bookmark List</h1>
      <div>
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
              className="flex flex-col gap-2"
            >
              <div className="border border-gray-500 rounded-2xl p-3 mb-2 flex items-center">
                <div className="w-10 h-10">
                  {<ReactCountryFlag svg countryCode={item.countryCode} />}
                </div>
                <span className="text-lg font-bold mr-3">{item.cityName}</span>
                <span>{item.country}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
