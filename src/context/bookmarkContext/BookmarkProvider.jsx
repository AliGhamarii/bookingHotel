import axios from "axios";
import { useEffect, useState } from "react";
import BookmarkContext from "./BookmarkContext";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000";

function BookmarkProvider({ children }) {
  const [errorCurrBookmark, setErrorCurrBookmark] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  // get data from backend.
  useEffect(() => {
    const fetchBookmarkList = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookmarkList();
  }, []);

  // create new bookmark
  async function createNewBookmark(newBookmark) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      setErrorCurrBookmark(error);
    } finally {
      setIsLoading(false);
    }
  }

  // set current bookmark
  async function getCurrentBookmark(id) {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
    } catch (err) {
      setErrorCurrBookmark(err);
    } finally {
      setIsLoading(false);
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
        createNewBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;
