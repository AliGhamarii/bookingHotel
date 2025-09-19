import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";

function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  console.log(lat, lng);

  return (
    <div className="flex  justify-center items-center h-[710px] bg-gray-50 p-5">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          📌 Add New Bookmark
        </h1>
        <form className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">City Name</label>
            <input
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter city name..."
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Country</label>
            <input
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              type="text"
              placeholder="Enter country..."
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              type="button"
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow-sm transition cursor-pointer"
            >
              &larr; Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition cursor-pointer"
            >
              Add Bookmark
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewBookmark;
