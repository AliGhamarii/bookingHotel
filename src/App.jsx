import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LocationList from "./components/LocationList/LocationList";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LocationList />} />
      </Routes>
    </Layout>
  );
}

export default App;
