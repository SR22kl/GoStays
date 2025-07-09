import React, { use, useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const [loading, setLoading] = useState(false);

  // console.log(inputs)
  const submitHandler = async (e) => {
    e.preventDefault();

    //Check if all inputs are filled!
    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !Object.values(images).some((image) => image)
    ) {
      toast.error("All fields are required!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      //Converting Amenities to Array & keeping only enabled Amenities
      const amenities = Object.keys(inputs.amenities).filter((key) => {
        return inputs.amenities[key]; 
      });
      formData.append("amenities", JSON.stringify(amenities));
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      //Adding Images to FormData
      Object.keys(images).forEach((key) => {
        images[key] && formData.append("images", images[key]);
      });

      const token = await getToken();
      const { data } = await axios.post("/api/rooms/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        toast.success(data.message);
        setInputs({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Free WiFi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
          },
        });
        setImages({
          1: null,
          2: null,
          3: null,
          4: null,
        });
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className="mt-16">
        <Title
          align={"left"}
          font={"outfit"}
          title={"Add Room"}
          subTitle={
            "Fill the details like room details, pricing and amenities carefully & accurately to enhance the user booking experience."
          }
        />
        {/* Uplaod Araa For Images */}
        <p className="text-gray-800 mt-10">Images</p>
        <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
          {Object.keys(images).map((key) => (
            <label htmlFor={`roomImage${key}`} key={key}>
              <img
                src={
                  images[key]
                    ? URL.createObjectURL(images[key])
                    : assets.uploadArea
                }
                className="max-h-14 cursor-pointer opacity-80"
                alt="images"
              />
              <input
                type="file"
                accept="image/*"
                id={`roomImage${key}`}
                hidden
                onChange={(e) => {
                  setImages({ ...images, [key]: e.target.files[0] });
                }}
              />
            </label>
          ))}
        </div>

        <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
          <div className="flex-1 max-w-48">
            <p className="text-gray-800 mt-4">Room Type</p>
            <select
              value={inputs.roomType}
              onChange={(e) =>
                setInputs({ ...inputs, roomType: e.target.value })
              }
              className="border border-gray-400 mt-1 rounded p-2 w-full opacity-70 outline-none"
            >
              <option value="">Select Room Type</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Luxury Room">Luxury Room</option>
              <option value="Family Suite">Family Suite</option>
            </select>
          </div>
          <div>
            <p className="mt-4 text-gray-800">
              Price <span className="text-xs">/Night</span>
            </p>
            <input
              type="number"
              placeholder="0"
              className="border border-gray-400 mt-1 rounded p-2 w-24 opacity-70 outline-none"
              value={inputs.pricePerNight}
              onChange={(e) =>
                setInputs({ ...inputs, pricePerNight: e.target.value })
              }
            />
          </div>
        </div>
        <p className="text-gray-800 mt-4">Amenities</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-gray-700 max-w-sm">
          {Object.keys(inputs.amenities).map((amenity, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`amenities${index + 1}`}
                checked={inputs.amenities[amenity]}
                onChange={() =>
                  setInputs({
                    ...inputs,
                    amenities: {
                      ...inputs.amenities,
                      [amenity]: !inputs.amenities[amenity],
                    },
                  })
                }
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <label
                htmlFor={`amenities${index + 1}`}
                className="ml-2 text-sm select-none cursor-pointer capitalize"
              >
                {amenity}
              </label>
            </div>
          ))}
        </div>
        <button
          disabled={loading}
          className="mt-6 px-6 py-2 bg-gradient-to-b from-indigo-400 to-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 cursor-pointer"
        >
          {loading ? "Adding Room..." : "Add Room"}
        </button>
      </form>
    </>
  );
};

export default AddRoom;
