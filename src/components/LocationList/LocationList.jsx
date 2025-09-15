import useFetchData from "../../hooks/useFetchData";
import Loading from "../Loading/Loading";

function LocationList() {
  const { data, isLoading } = useFetchData("http://localhost:5000/hotels");

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold my-10 text-center text-gray-800">
        Nearby Locations
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((location) => (
          <div
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            key={location.id}
          >
            <img
              src={location.picture_url.url}
              alt={location.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-500 text-sm">{location.smart_location}</p>
              <h2 className="text-lg font-semibold mt-1">{location.name}</h2>

              {/* نوع ملک و اتاق */}
              <p className="text-gray-400 text-sm mt-1">
                {location.property_type} • {location.room_type}
              </p>

              {/* امکانات اتاق */}
              <p className="text-gray-500 text-sm mt-1">
                🛏 {location.beds} Beds • 🛁 {location.bathrooms} Baths • 🛋{" "}
                {location.bedrooms} Rooms
              </p>

              {/* قیمت */}
              <div className="mt-2">
                <span className="text-blue-600 font-bold">
                  €{location.price} / night
                </span>
              </div>

              {/* میزبان */}
              <div className="flex items-center mt-3">
                <img
                  src={location.host_thumbnail_url}
                  alt={location.host_name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-gray-700 text-sm">
                  {location.host_name}
                </span>
              </div>

              {/* امتیاز و تعداد بازبینی */}
              <div className="mt-2 text-sm text-yellow-500">
                ⭐ {location.review_scores_rating} ({location.number_of_reviews}{" "}
                reviews)
              </div>

              {/* لینک به Airbnb */}
              <a
                href={location.listing_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm mt-2 inline-block"
              >
                View on Airbnb
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationList;
