import axios from "axios";
import useFetchData from "../../hooks/useFetchData";
import { useState } from "react";
import BookmarkContext from "./BookmarkContext";

const baseUrl = "http://localhost:5000";

function BookmarkProvider({ children }) {
  const [errorCurrBookmark, setErrorCurrBookmark] = useState();
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);
  const [currentBookmark, setCurrentBookmark] = useState(null);

  // get data from backend.
  const { isLoading, data: bookmarks } = useFetchData(`${baseUrl}/bookmarks`);

  // set current bookmark
  async function getCurrentBookmark(id) {
    try {
      setIsLoadingCurrBookmark(true);
      const { data } = await axios.get(`${baseUrl}/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (err) {
      setErrorCurrBookmark(err);
    } finally {
      setIsLoadingCurrBookmark(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        currentBookmark,
        getCurrentBookmark,
        errorCurrBookmark,
        isLoadingCurrBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;
