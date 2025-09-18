import { useContext } from "react";
import BookmarkContext from "../context/bookmarkContext/BookmarkContext";

function useBookmark() {
  return useContext(BookmarkContext);
}
export default useBookmark;
