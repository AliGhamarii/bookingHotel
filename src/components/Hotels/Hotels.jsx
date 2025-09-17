import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import useHotels from "../../hooks/useHotels";

function Hotels() {
  const { hotels, isLoading, currentHottel } = useHotels();
  if (isLoading) return <Loading />;

  return (
    <div className="h-[700px] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        Your Search Results ({hotels.length})
      </h1>

      <div className="flex flex-col gap-6 px-4">
        {hotels.map((hotel) => (
          <Link
            key={hotel.id}
            to={`/hotels/${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`}
            // target="_blank"
            className="block hover:scale-[1.02] transition-transform duration-200"
          >
            <div
              className={`flex gap-4 bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${
                currentHottel?.id === hotel.id ? "border-2 border-red-400 " : ""
              }`}
            >
              <img
                src={hotel.picture_url.url}
                alt={hotel.name}
                className="w-1/3 object-cover"
              />
              <div className="flex flex-col justify-between p-4 w-2/3">
                <div>
                  <p className="text-sm text-gray-500">
                    {hotel.smart_location}
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {hotel.name}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {hotel.property_type} - {hotel.room_type}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {hotel.bedrooms} bed(s), accommodates {hotel.accommodates}{" "}
                    guest(s)
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-blue-600 font-bold text-lg">
                    €{hotel.price} / night
                  </span>
                  <span className="text-gray-500 text-sm">
                    ⭐ {hotel.review_scores_rating} ({hotel.number_of_reviews})
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
