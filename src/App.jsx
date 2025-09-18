import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LocationList from "./components/LocationList/LocationList";
import HotelsLayout from "./components/HotelsLayout/HotelsLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelProvider from "./context/hotelContext/HotelProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";

function App() {
  return (
    <HotelProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<HotelsLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<BookmarkLayout />} />
        </Routes>
      </Layout>
    </HotelProvider>
  );
}

export default App;
