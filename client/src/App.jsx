import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import HotelReg from "./components/HotelReg";
import Navbar from "./components/Navbar";
import AllRooms from "./pages/AllRooms";
import Home from "./pages/Home";
import AddRoom from "./pages/HotelOwner/AddRoom";
import Dashboard from "./pages/HotelOwner/Dashboard";
import Layout from "./pages/HotelOwner/Layout";
import ListRoom from "./pages/HotelOwner/ListRoom";
import MyBookings from "./pages/MyBookings";
import RoomDetails from "./pages/RoomDetails";
import { useAppContext } from "./context/AppContext";
import AuthPage from "./pages/AuthPage";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  const { showHotelReg } = useAppContext();
  return (
    <>
      <div>
        <ToastContainer position="top-right" />
        {!isOwnerPath && <Navbar />}
        {showHotelReg && <HotelReg />}
        <div className="min-h-[70vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<AllRooms />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/my-bookings" element={<MyBookings />} />

            {/* Routes for Clerk's auth UI*/}
            <Route path="/sign-in/*" element={<AuthPage />} />
            <Route path="/sign-up/*" element={<AuthPage />} />

            <Route path="/owner" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="add-room" element={<AddRoom />} />
              <Route path="list-room" element={<ListRoom />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
