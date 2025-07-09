import axios from "axios";
import { useContext } from "react";
import { createContext } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [loadingRooms, setLoadingRooms] = useState(false);

  // console.log(rooms)

  const fetchRooms = async () => {
    setLoadingRooms(true);
    try {
      const { data } = await axios.get(`/api/rooms`);
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingRooms(false);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        // console.log("Clerk Token:", token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, [getToken]);

  const fetchUser = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setIsOwner(data.role === "hotelOwner");
        setSearchedCities(data.recentSearchedCities);
      } else {
        //Retry Fetching User Details after 5 sec
        setTimeout(() => {
          if (user) {
            fetchUser();
          }
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user, getToken]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const value = {
    currency,
    user,
    getToken,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    axios,
    searchedCities,
    setSearchedCities,
    rooms,
    setRooms,
    loadingRooms,
  };
  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>;
    </>
  );
};

export const useAppContext = () => useContext(AppContext);
