import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import ReactCountryFlag from "react-country-flag";
import useBookmark from "../../hooks/useBookmark";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [country, setCountry] = useState("");
  const [cityName, setCityName] = useState("");
  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [countryCode, setCountryCode] = useState("");

  // فیلدهای اضافه
  const [province, setProvince] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [county, setCounty] = useState("");
  const [district, setDistrict] = useState("");
  const [continent, setContinent] = useState("");
  const [continentCode, setContinentCode] = useState("");
  const [plusCode, setPlusCode] = useState("");
  const [timezone, setTimezone] = useState("");
  const [lookupSource, setLookupSource] = useState("");
  const [localityLanguageRequested, setLocalityLanguageRequested] =
    useState("");
  const [postcode, setPostcode] = useState("");
  const { createNewBookmark } = useBookmark();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchGeoLocation() {
      try {
        setIsLoadingGeoLocation(true);
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        console.log(data);

        if (!data.countryCode) throw new Error("This location is not a city!");

        setCountry(data.countryName);
        setCityName(data.city || data.locality || "");
        setCountryCode(data.countryCode);

        // فیلدهای تکمیلی
        setProvince(data.principalSubdivision);
        setProvinceCode(data.principalSubdivisionCode);
        setCounty(
          data.localityInfo?.administrative?.find((a) => a.adminLevel === 5)
            ?.name || ""
        );
        setDistrict(
          data.localityInfo?.administrative?.find((a) => a.adminLevel === 7)
            ?.name || ""
        );
        setContinent(data.continent);
        setContinentCode(data.continentCode);
        setPlusCode(data.plusCode);
        setTimezone(
          data.localityInfo?.informative?.find((i) => i.name.includes("/"))
            ?.name || ""
        );
        setLookupSource(data.lookupSource);
        setLocalityLanguageRequested(data.localityLanguageRequested);
        setPostcode(data.postcode || "");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoadingGeoLocation(false);
      }
    }

    fetchGeoLocation();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newBookmark = {
      city: cityName,
      locality: cityName,
      country,
      countryCode,
      province,
      provinceCode,
      county,
      district,
      continent,
      continentCode,
      latitude: lat,
      longitude: lng,
      plusCode,
      timezone,
      lookupSource,
      localityLanguageRequested,
      postcode,
    };

    await createNewBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoadingGeoLocation) return <Loading />;

  return (
    <div className="flex justify-center items-center h-[710px] bg-gray-50 p-5">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          📌 Add New Bookmark
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">City Name</label>
            <input
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter city name..."
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              <span className="text-4xl">
                <ReactCountryFlag svg countryCode={countryCode} />
              </span>{" "}
              Country
            </label>
            <input
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              type="text"
              placeholder="Enter country..."
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
              Add to Bookmark
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewBookmark;
