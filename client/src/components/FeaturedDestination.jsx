import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const FeaturedDestination = () => {
  const { rooms } = useAppContext();
  const navigate = useNavigate();
  return (
    rooms.length > 0 && (
      <>
        <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
          <Title
            title={"Featured Destinations"}
            subTitle={
              "Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury & unforgettable experiences."
            }
          />
          <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
            {rooms?.slice(0, 4).map((room, index) => (
              <HotelCard room={room} index={index} key={room._id} />
            ))}
          </div>

          <button
            onClick={() => {
              navigate("/rooms");
              scrollTo(0, 0);
            }}
            className="flex group gap-2 my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
          >
            View All Destinations
            <img
              className="mt-1 group-hover:translate-x-1.5 duration-300 ease-linear cursor-pointer"
              src={assets.arrowIcon}
              alt="arrowRight"
            />
          </button>
        </div>
      </>
    )
  );
};

export default FeaturedDestination;
