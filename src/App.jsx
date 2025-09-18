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
              <Route path=":id" element={<div>single bookmark</div>} />
              <Route path="add" element={<div>add bookmark</div>} />
            </Route>
          </Routes>
        </Layout>
      </HotelProvider>
    </BookmarkProvider>
  );
}

export default App;
