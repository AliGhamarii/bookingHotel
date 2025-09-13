import AppHeader from "./components/AppHeader/AppHeader";
import Layout from "./components/layout/Layout";
import { Toaster } from "react-hot-toast";
import LocationList from "./components/LocationList/LocationList";

function App() {
  return (
    <Layout>
      <Toaster />
      <AppHeader />
      <LocationList />
    </Layout>
  );
}

export default App;
