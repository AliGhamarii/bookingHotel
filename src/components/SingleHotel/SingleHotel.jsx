import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useEffect } from "react";
import useHotels from "../../hooks/useHotels";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

function SingleHotel() {
  const { id } = useParams();
  const { getCurrentHottel, isLoadingCurrentHottel, currentHottel } =
    useHotels();
  const navigate = useNavigate();
  // send id hotel to hotel context
  useEffect(() => {
    getCurrentHottel(id);
  }, [id]);

  // triger loader
  if (isLoadingCurrentHottel || !currentHottel) return <Loading />;

  if (!currentHottel)
    return <div className="text-center mt-10">Hotel not found.</div>;

  return (
    <div className="w-full h-[700px] overflow-y-scroll p-6 bg-white shadow-lg">
      {/* Hotel Name */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold mb-4 max-w-[90%]">
          {currentHottel.name}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-gray-400 hover:bg-red-600 transition-colors rounded-full flex items-center justify-center shadow-md cursor-pointer"
        >
          <ChevronLeftIcon className="text-white w-6 h-6" />
        </button>
      </div>

      {/* Hero Image */}
      {currentHottel.picture_url?.url ? (
        <img
          src={currentHottel.picture_url.url}
          alt={currentHottel.name}
          className="w-full h-64 object-cover rounded-lg shadow mb-4"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow mb-4">
          Image not available
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 gap-2 mb-4 text-gray-700">
        <p>
          <span className="font-semibold">Property Type:</span>{" "}
          {currentHottel.property_type}
        </p>
        <p>
          <span className="font-semibold">Room Type:</span>{" "}
          {currentHottel.room_type}
        </p>
        <p>
          <span className="font-semibold">Price:</span> ${currentHottel.price}
        </p>
        <p>
          <span className="font-semibold">Accommodates:</span>{" "}
          {currentHottel.accommodates} guest(s)
        </p>
        <p>
          <span className="font-semibold">City:</span> {currentHottel.city}
        </p>
        <p>
          <span className="font-semibold">State:</span> {currentHottel.state}
        </p>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 mb-2">{currentHottel.summary}</p>
        <p className="text-gray-700">{currentHottel.description}</p>
      </div>

      {/* Host Info */}
      {currentHottel.host_name && (
        <div className="flex items-center mb-4">
          <img
            src={currentHottel.host_picture_url}
            alt={currentHottel.host_name}
            className="w-12 h-12 rounded-full mr-3 shadow"
          />
          <div>
            <p className="font-semibold">{currentHottel.host_name}</p>
            <p className="text-gray-600 text-sm">
              {currentHottel.host_location}
            </p>
          </div>
        </div>
      )}

      {/* Amenities */}
      {currentHottel.amenities?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Amenities</h2>
          <ul className="list-disc list-inside text-gray-700 grid grid-cols-2 gap-1">
            {currentHottel.amenities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SingleHotel;
