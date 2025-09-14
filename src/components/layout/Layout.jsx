import { Toaster } from "react-hot-toast";
import AppHeader from "../AppHeader/AppHeader";

// template for App
function Layout({ children }) {
  return (
    <div className="max-w-screen-xl mx-auto min-h-screen px-5 mt-7 mb-10">
      <Toaster />
      <AppHeader />
      {children}
    </div>
  );
}

export default Layout;
