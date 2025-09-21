import axios from "axios";
import { useEffect, useReducer } from "react";
import BookmarkContext from "./BookmarkContext";
import toast from "react-hot-toast";

// base_url
const BASE_URL = "http://localhost:5000";

// initial state for reducer function.
const initialStateReducer = {
  isLoading: false,
  bookmarks: [],
  currentBookmark: {},
  errorCurrBookmark: null,
  error: null,
};

// reducer function
function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "bookmarksLoaded":
      return { ...state, bookmarks: action.payload, isLoading: false };
    case "bookmarkLoaded":
      return {
        ...state,
        currentBookmark: action.payload,
        isLoading: false,
      };
    case "bookmarkCreated":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "bookmarkDeleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: null,
      };
    case "rejected":
      return { ...state };
    default:
      throw new Error("Unknown Action");
  }
}

function BookmarkProvider({ children }) {
  const [
    { isLoading, bookmarks, currentBookmark, errorCurrBookmark },
    dispatch,
  ] = useReducer(bookmarkReducer, initialStateReducer);

  // get data from backend.
  useEffect(() => {
    const fetchBookmarkList = async () => {
      try {
        dispatch({ type: "loading" });
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarksLoaded", payload: data });
      } catch (err) {
        toast.error(err.message);
        dispatch({ type: "rejected", payload: err });
      }
    };
    fetchBookmarkList();
  }, []);

  // create new bookmark
  async function createNewBookmark(newBookmark) {
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      dispatch({ type: "bookmarkCreated", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  // set current bookmark
  async function getCurrentBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmarkLoaded", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  // delete bookmark
  async function deleteBookmark(id) {
    try {
      dispatch({ type: "loading" });
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmarkDeleted", payload: id });
    } catch (err) {
      toast.error(err.message);
      dispatch({ type: "rejected", payload: err.message });
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
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;
