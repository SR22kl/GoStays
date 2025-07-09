import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const RoomDetails = () => {
  const { id } = useParams();
  const { axios, getToken, rooms } = useAppContext();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  const checkAvailability = async (e) => {
    try {
      // Check-In-Date is greater than Check-Out-Date
      if (checkInDate >= checkOutDate) {
        toast.error("Check-Out date must be greater than Check-In date.");
        return;
      }
      const { data } = await axios.post(`/api/bookings/check-availability`, {
        room: id,
        checkInDate,
        checkOutDate,
      });
      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room is available for booking!");
        } else {
          setIsAvailable(false);
          toast.error("Room is not available for the selected dates.");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //onSubmitHandler function to check availability & book the room
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!isAvailable) {
        return checkAvailability();
      } else {
        const token = await getToken();
        const { data } = await axios.post(
          `/api/bookings/book`,
          {
            room: id,
            checkInDate,
            checkOutDate,
            guests,
            paymentMethod: "Pay At Hotel",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.success) {
          toast.success(data.message);
          navigate("/my-bookings");
        } else {
          toast.error(data.message);
          scrollTo(0, 0);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const room = rooms.find((room) => room._id === id);
    room && setRoom(room);
    room && setMainImage(room?.images[0]);
  }, [rooms]);

  return (
    room && (
      <>
        <div className="pt-24 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32">
          {/* Room Details */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-playfair">
              {room?.hotel?.name}{" "}
              <span className="font-inter text-sm">({room?.roomType})</span>
            </h1>
            <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full select-none">
              20% OFF
            </p>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-2">
            <StarRating />
            <p className="ml-2">200+ Reviews</p>
          </div>

          {/* Room Address */}
          <div className="flex items-center text-gray-500 gap-1 mt-2">
            <img src={assets.locationIcon} alt="locationIcon" />
            <span>{room?.hotel?.address}</span>
          </div>

          {/* Room Images */}
          <div className="flex flex-col lg:flex-row gap-4 mt-6">
            <div className="lg:w-1/2 w-full">
              <img
                className="w-full rounded-xl shadow-lg object-cover"
                src={mainImage}
                alt=""
              />
            </div>
            <div className="grid grid-cols-2 md:gap-3 gap-2  lg:w-1/2 w-full cursor-pointer ">
              {room?.images.length > 1 &&
                room.images.map((image, index) => (
                  <img
                    onClick={() => setMainImage(image)}
                    className={`w-full rounded-xl shadow-lg object-cover hover:outline-3 outline-orange-500 ${
                      image === mainImage && "outline-3 outline-orange-500"
                    }`}
                    key={index}
                    src={image}
                    alt="RoomImg"
                  />
                ))}
            </div>
          </div>
          {/* Room Highlights */}
          <div className="flex flex-col md:flex-row md:justify-between mt-10">
            <div className="flex flex-col">
              <h1 className="font-playfair text-3xl md:text-4xl font-semibold">
                Experience Luxury Like Never Before!
              </h1>
              <div className="flex flex-wrap items-center mt-3 gap-2 mb-6 select-none">
                {room?.amenities.map((item, index) => (
                  <div
                    className="flex items-center gap-2 bg-sky-100 px-3 py-2 rounded-lg "
                    key={index}
                  >
                    <img
                      className="w-5 h-5"
                      src={facilityIcons[item]}
                      alt={item}
                    />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Room Price */}
            <p className="text-2xl font-medium">${room?.pricePerNight}/Night</p>
          </div>
          {/* CheckIn & CheckOut Form */}
          <form onSubmit={onSubmitHandler} className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white border-t border-gray-200 shadow-lg p-6 rounded-xl mx-auto mt-16 max-w-6xl">
            <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
              <div className="flex flex-col">
                <label htmlFor="checkInDate" className="font-medium">
                  Check-In
                </label>
                <input
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  type="date"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 mt-2 outline-none"
                  placeholder="Check-In Date"
                  id="checkInDate"
                  required
                />
              </div>

              <div className="w-px h-16 bg-gray-300/70 max-md:hidden"></div>

              <div className="flex flex-col">
                <label htmlFor="checkOutDate" className="font-medium">
                  Check-Out
                </label>
                <input
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={checkInDate}
                  disabled={!checkInDate}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 mt-2 outline-none"
                  type="date"
                  placeholder="Check-Out Date"
                  id="checkOutDate"
                  required
                />
              </div>

              <div className="w-px h-16 bg-gray-300/70 max-md:hidden"></div>

              <div className="flex flex-col">
                <label htmlFor="guests" className="font-medium">
                  Guests
                </label>
                <input
                  onChange={(e) => setGuests(e.target.value)}
                  value={guests}
                  className="max-w-20 rounded-md border border-gray-300 px-3 py-2 mt-2 outline-none"
                  type="number"
                  placeholder="1"
                  id="guests"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-24 py-3 text-base cursor-pointer"
            >
              {isAvailable ? "Book Now" : "Check Availability"}
            </button>
          </form>
          {/* Common Specification */}
          <div className="mt-24 space-y-4">
            {roomCommonData.map((spec, index) => (
              <div key={index} className="flex items-start gap-2">
                <img className="w-7" src={spec?.icon} alt={spec?.title} />
                <div>
                  <p className="text-base">{spec?.title}</p>
                  <p className="text-gray-500">{spec?.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl border-y border-gray-300 my-16 py-10 text-gray-500">
            <p>
              Gests will be allocated on the ground floor according to
              availability. You get a comfortable Two bedroom apartment has a
              true city feeling. The price quoted is for two guests, at the
              guest slot please mark the number of guests to get the exact price
              for groups. The Guests will be allocated ground floor according to
              availability. You get the comfortable two bedroom apartment that
              has a true city feeling.
            </p>
          </div>

          {/* Hosted by */}
          <div className="flex flex-col items-start gap-4 md:mb-0 mb-10">
            <div className="flex gap-4 items-center">
              <img
                src={room?.hotel?.owner?.image}
                alt="hostImg"
                className="h-14 w-14 md:h-18 md:w-18 rounded-full"
              />
              <div>
                <p className="text-lg md:text-xl">
                  Hosted By {room?.hotel?.name}
                </p>
                <div className="flex items-center mt-1">
                  <StarRating />
                  <p className="ml-2">200+ Reviews</p>
                </div>
              </div>
            </div>
            <button className="px-6 py-2.5 mt-4 rounded text-white bg-orange-500 cursor-pointer">
              Contact Now!
            </button>
          </div>
        </div>
      </>
    )
  );
};

export default RoomDetails;
