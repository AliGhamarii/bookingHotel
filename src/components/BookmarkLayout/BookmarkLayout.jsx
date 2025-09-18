import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import useBookmark from "../../hooks/useBookmark";

function BookmarkLayout() {
  const { bookmarks } = useBookmark();
  return (
    <div className="w-full max-h-screen flex">
      <div className="w-[40%] mr-10">
        <Outlet />
      </div>
      <Map markerLocation={bookmarks} />
    </div>
  );
}

export default BookmarkLayout;
