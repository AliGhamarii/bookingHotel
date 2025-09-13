import useFetchData from "../../hooks/useFetchData";
import Loading from "../Loading/Loading";

function LocationList() {
  const { data, isLoading } = useFetchData("http://localhost:5000/hotels");

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
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
              <div className="mt-2">
                <span className="text-blue-600 font-bold">
                  €{location.price} / night
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationList;
