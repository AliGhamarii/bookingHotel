import { useSearchParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../Loading/Loading";

function Hotels() {
  const [searchParams] = useSearchParams();

  // get query data.
  const destination = searchParams.get("destination");

  const rooms = JSON.parse(searchParams.get("option"))?.rooms;

  // get data from backend.
  const { isLoading, data } = useFetchData(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${rooms || 1}`
  );
  
  if (isLoading) return <Loading />;

  return <div>number of Hotels : {data.length}</div>;
}

export default Hotels;
