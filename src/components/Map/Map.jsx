import useHotels from "../../hooks/useHotels";

function Map() {
  const { hotels, isLoading } = useHotels();
  return <div className="w-1/2"></div>;
}

export default Map;
