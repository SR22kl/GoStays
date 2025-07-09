import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { assets, facilityIcons } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};
const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOptions"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const { rooms, currency } = useAppContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    roomTypes: [],
    priceRanges: [],
  });

  const roomTypes = [
    "Single Bed",
    "Double Bed",
    "Queen Size Bed",
    "King Size Bed",
    "Luxury Room",
    "Family Suite",
  ];

  const priceRanges = [
    "0 - 500",
    "500 - 1000",
    "1000 - 2000",
    "2000 - 3000",
    "3000 - 4000",
    "4000 - 5000",
  ];

  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Newest First",
  ];

  // Handle changes for filters & sorting
  const handleFilterChage = (checked, value, type) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[type].push(value);
      } else {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value
        );
      }
      return updatedFilters;
    });
  };

  const handleSortChage = (sortOption) => {
    setSelectedSort(sortOption);
  };

  //Functoion to check if a room matches the selected room types
  const matchRoomTypes = (room) => {
    return (
      selectedFilters.roomTypes.length === 0 ||
      selectedFilters.roomTypes.includes(room.roomType)
    );
  };

  //Function to check if a room matches the selected price ranges
  const matchPriceRanges = (room) => {
    return (
      selectedFilters.priceRanges.length === 0 ||
      selectedFilters.priceRanges.some((range) => {
        const [minStr, maxStr] = range.split(" - ");
        const min = Number(minStr);
        const max = Number(maxStr);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    );
  };

  //Function to sort room based on the selected sort option
  const sortRooms = (a, b) => {
    if (selectedSort === "Price: Low to High") {
      return a.pricePerNight - b.pricePerNight;
    } else if (selectedSort === "Price: High to Low") {
      return b.pricePerNight - a.pricePerNight;
    } else if (selectedSort === "Newest First") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  };

  //Filter Destination
  const filterDestination = (room) => {
    const destination = searchParams.get("destination");
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };

  //filter & sort rooms based on selected filters and sort option
  const filteredRooms = useMemo(() => {
    return rooms
      .filter(
        (room) =>
          matchRoomTypes(room) &&
          matchPriceRanges(room) &&
          filterDestination(room)
      )
      .sort(sortRooms);
  }, [rooms, selectedFilters, selectedSort, searchParams]);

  //Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      roomTypes: [],
      priceRanges: [],
    });
    setSelectedSort("");
    setSearchParams({});
    // setOpenFilters(false);
  };

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* left side */}
        <div className="">
          <div className="flex flex-col items-start text-left">
            <h1 className="font-playfair text-4xl md:text-[40px]">
              Hotel Rooms
            </h1>
            <p className="text-sm md:text-base text-gray-500/90 mt-2">
              Take advantage of our limited-time offers & special packages to
              enhance our stay & create unforgettable memories.
            </p>
          </div>
          {filteredRooms?.map((room) => (
            <div
              key={room._id}
              className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
            >
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                src={room.images[0]}
                alt="hotelImg"
                title="View Room Details"
                className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
              />
              <div className="md:w-1/2 flex flex-col gap-2">
                <p className="text-gray-500">{room?.hotel?.city}</p>
                <p
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                  className="text-gray-800 text-3xl font-playfair cursor-pointer"
                >
                  {room?.hotel?.name}
                </p>
                <div className="flex items-center">
                  <StarRating />
                  <p className="ml-2">200+ Reviews!</p>
                </div>
                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                  <img src={assets.locationIcon} alt="locIcon" />
                  <span>{room?.hotel?.address}</span>
                </div>
                {/* Room Type  */}
                <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                  <span className="text-lg">{room?.roomType}</span>
                </div>
                
                {/* Room Amenities */}
                <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]"
                    >
                      <img
                        src={facilityIcons[item]}
                        alt={item}
                        className="w-5 h-5"
                      />
                      <p className="text-xs">{item}</p>
                    </div>
                  ))}
                </div>
                {/* Room price per Night */}
                <p className="text-xl font-medium text-gray-700">
                  ${room?.pricePerNight}/Night
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* right side Filters */}
        <div className="bg-white w-80 border-t rounded-md shadow-lg border-gray-100 text-gray-600 max-lg:mb-8 min-lg:mt-16">
          <div
            className={`flex items-center justify-between px-4 py-2 border-b border-gray-100 ${
              openFilters && "border-b"
            }`}
          >
            <p className="text-base font-medium text-gray-800">FILTERS</p>
            <div className="text-xs cursor-pointer">
              <span
                onClick={() => setOpenFilters(!openFilters)}
                className="lg:hidden"
              >
                {openFilters ? "HIDE" : "SHOW"}
              </span>
              <span className=" hidden lg:block">CLEAR</span>
            </div>
          </div>
          <div
            className={`${
              openFilters ? "h-auto" : "h-0 lg:h-auto"
            } overflow-hidden transition-all duration-700 ease-in-out`}
          >
            <div className="px-5 pt-5">
              <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
              {roomTypes.map((room, index) => (
                <CheckBox
                  key={index}
                  label={room}
                  onChange={(check) =>
                    handleFilterChage(check, room, "roomTypes")
                  }
                  selected={selectedFilters.roomTypes.includes(room)}
                />
              ))}
            </div>

            <div className="px-5 pt-5">
              <p className="font-medium text-gray-800 pb-2">Price Range</p>
              {priceRanges.map((price, index) => (
                <CheckBox
                  key={index}
                  label={`${currency} ${price}`}
                  onChange={(check) =>
                    handleFilterChage(check, price, "priceRanges")
                  }
                  selected={selectedFilters.priceRanges.includes(price)}
                />
              ))}
            </div>

            <div className="px-5 pt-5 pb-8">
              <p className="font-medium text-gray-800 pb-2">Sort By</p>
              {sortOptions.map((option, index) => (
                <RadioButton
                  key={index}
                  label={option}
                  selected={selectedSort === option}
                  onChange={() => handleSortChage(option)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRooms;
