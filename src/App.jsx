import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LocationList from "./components/LocationList/LocationList";
import HotelsLayout from "./components/HotelsLayout/HotelsLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelProvider from "./context/hotelContext/HotelProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import Bookmark from "./components/Bookmark/Bookmark";
import BookmarkProvider from "./context/bookmarkContext/BookmarkProvider";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";

function App() {
  return (
    <BookmarkProvider>
      <HotelProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<HotelsLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmark" element={<BookmarkLayout />}>
              <Route index element={<Bookmark />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
          </Routes>
        </Layout>
      </HotelProvider>
    </BookmarkProvider>
  );
}

export default App;
