import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LocationList from "./components/LocationList/LocationList";
import HotelsLayout from "./components/HotelsLayout/HotelsLayout";
import SingleHotel from "./components/HotelsLayout/SingleHotel";
import Hotels from "./components/Hotels/Hotels";
import HotelProvider from "./context/hotelContext/HotelProvider";

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
        </Routes>
      </Layout>
    </HotelProvider>
  );
}

export default App;
