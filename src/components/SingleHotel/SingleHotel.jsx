import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../Loading/Loading";

function SingleHotel() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchData(
    `http://localhost:5000/hotels/${id}`
  );

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Error fetching hotel data.
      </div>
    );

  if (!data) return <div className="text-center mt-10">Hotel not found.</div>;

  return (
    <div className="w-full h-[700px] overflow-y-scroll p-6 bg-white shadow-lg">
      {/* Hotel Name */}
      <h1 className="text-3xl font-bold mb-4">{data.name}</h1>

      {/* Hero Image */}
      {data.picture_url?.url ? (
        <img
          src={data.picture_url.url}
          alt={data.name}
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
          {data.property_type}
        </p>
        <p>
          <span className="font-semibold">Room Type:</span> {data.room_type}
        </p>
        <p>
          <span className="font-semibold">Price:</span> ${data.price}
        </p>
        <p>
          <span className="font-semibold">Accommodates:</span>{" "}
          {data.accommodates} guest(s)
        </p>
        <p>
          <span className="font-semibold">City:</span> {data.city}
        </p>
        <p>
          <span className="font-semibold">State:</span> {data.state}
        </p>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 mb-2">{data.summary}</p>
        <p className="text-gray-700">{data.description}</p>
      </div>

      {/* Host Info */}
      {data.host_name && (
        <div className="flex items-center mb-4">
          <img
            src={data.host_picture_url}
            alt={data.host_name}
            className="w-12 h-12 rounded-full mr-3 shadow"
          />
          <div>
            <p className="font-semibold">{data.host_name}</p>
            <p className="text-gray-600 text-sm">{data.host_location}</p>
          </div>
        </div>
      )}

      {/* Amenities */}
      {data.amenities?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Amenities</h2>
          <ul className="list-disc list-inside text-gray-700 grid grid-cols-2 gap-1">
            {data.amenities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SingleHotel;
