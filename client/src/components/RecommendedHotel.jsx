import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import HotelCard from "./HotelCard";
import Title from "./Title";

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  // console.log("RecommendedHotels: Current rooms from context:", rooms);
  // console.log(
  //   "RecommendedHotels: Current searchedCities from context:",
  //   searchedCities
  // );

  // Filter rooms based on searched cities
  const FilterHotels = () => {
    const filtered = rooms
      .slice()
      .filter((room) => searchedCities.includes(room?.hotel?.city));
    setRecommended(filtered);
  };

  useEffect(() => {
    FilterHotels();
  }, [rooms, searchedCities]);

  return (
    recommended?.length > 0 && (
      <>
        <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
          <Title
            title={"Recommended Hotels"}
            subTitle={
              "Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury & unforgettable experiences."
            }
          />
          <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
            {recommended?.slice(0, 4).map((room, index) => (
              <HotelCard room={room} index={index} key={room._id} />
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default RecommendedHotels;
