import { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();
  const { axios, getToken, setSearchedCities } = useAppContext();

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destination}`);

    // console.log("Banner: value of 'destination' state:", destination);

    //Call api to save recent searched city
    const token = await getToken();
    await axios.post(
      "/api/user/store-recent-search",
      {
        recentSearchedCities: destination,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //Add destination to searchedCities max 3 recent searched cities
    setSearchedCities((prevSearchedCities) => {
      const updatedSearchedCities = [...prevSearchedCities, destination];
      if (updatedSearchedCities.length > 3) {
        updatedSearchedCities.shift(); // Remove the oldest city if more than 3
      }
      // console.log(
      //   "Banner: updated searchedCities in context:",
      //   updatedSearchedCities
      // );
      return updatedSearchedCities;
    });
  };

  return (
    <>
      <div className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url('/bg.jpg')] bg-no-repeat bg-cover bg-center h-screen">
        <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">
          The Ultimate Hotel Experience
        </p>
        <h1 className="font-playfair text-2xl md:text-[56px] lg:text-6xl md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4">
          Discover Your Perfect Gateaway Destinataion
        </h1>
        <p className="max-w-130 mt-2 text-sm md:text-base">
          Unparalleled luxury & comfort await at the world's most exclusive
          hotels & resorts. Start lyour journey today.
        </p>
        <form
          onSubmit={onSearch}
          className="bg-white text-gray-500 rounded-lg px-6 py-4  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto mt-8 opacity-90"
        >
          <div>
            <div className="flex items-center gap-2">
              <img className="h-4" src={assets.calenderIcon} alt="calIcon" />
              <label htmlFor="destinationInput">Destination</label>
            </div>
            <input
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
              list="destinations"
              id="destinationInput"
              type="text"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              placeholder="Type here"
              required
            />
            <datalist id="destinations">
              {cities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <img src={assets.calenderIcon} className="h-4" alt="" />
              <label htmlFor="checkIn">Check in</label>
            </div>
            <input
              id="checkIn"
              type="date"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <img src={assets.calenderIcon} className="h-4" alt="" />
              <label htmlFor="checkOut">Check out</label>
            </div>
            <input
              id="checkOut"
              type="date"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            />
          </div>

          <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
            <label htmlFor="guests">Guests</label>
            <input
              min={1}
              max={4}
              id="guests"
              type="number"
              className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
              placeholder="0"
            />
          </div>

          <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1 opacity-90">
            <img src={assets.searchIcon} alt="searchIcon" className="h-7" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Banner;
