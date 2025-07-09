import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/HotelOwner/Navbar.jsx";
import Sidebar from "../../components/HotelOwner/Sidebar.jsx";
import { useAppContext } from "../../context/AppContext.jsx";
import { useEffect } from "react";

const Layout = () => {
  const { isOwner } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner]);
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 p-4 pt-10 md:px-10 h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
