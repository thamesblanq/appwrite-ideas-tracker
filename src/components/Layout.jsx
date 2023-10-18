import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
//import { DataProvider } from "../context/DataContext";
const Layout = () => {
  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout