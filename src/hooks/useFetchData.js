import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useFetchData(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // axios
    //   .get(url)
    //   .then((res) => {
    //     setData(res.data);
    //   })
    //   .catch((err) => {
    //     toast.error(err.response?.data || err.message);
    //   });
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url);
        setData(data);
      } catch (err) {
        toast.error(err.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, isLoading };
}
export default useFetchData;
