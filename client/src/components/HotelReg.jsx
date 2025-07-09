import { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const HotelReg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const sumbitHandler = async (event) => {
    try {
      event.preventDefault();
      const token = await getToken();
      const { data } = await axios.post("/api/hotels/register", { name, contact, address, city }, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        onClick={() => setShowHotelReg(false)}
        className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/60"
      >
        <form
          onSubmit={sumbitHandler}
          onClick={(e) => e.stopPropagation()}
          className="flex bg-white rounded-xl max-w-4xl max-md:mx-2"
        >
          <img
            src={assets.regImage}
            alt="regImg"
            className="w-1/2 rounded-xl hidden md:block"
          />
          <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
            <img
              onClick={() => setShowHotelReg(false)}
              className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
              src={assets.closeIcon}
              alt="closeIcon"
            />
            <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>

            {/* Hotel Name */}
            <div className="w-full mt-4">
              <label htmlFor="name" className="font-medium text-gray-500">
                Hotel Name
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                id="name"
                value={name}
                placeholder="Type Here"
                className="border border-gray-300 rounded w-full px-3 py-2 mt-1 outline-indigo-400 font-light required:"
                required
              />
            </div>
            {/* Contact */}
            <div className="w-full mt-4">
              <label htmlFor="contact" className="font-medium text-gray-500">
                Contact No.
              </label>
              <input
                type="text"
                onChange={(e) => setContact(e.target.value)}
                id="contact"
                value={contact}
                placeholder="Type Here"
                className="border border-gray-300 rounded w-full px-3 py-2 mt-1 outline-indigo-400 font-light required:"
                required
              />
            </div>
            {/* Address */}
            <div className="w-full mt-4">
              <label htmlFor="address" className="font-medium text-gray-500">
                Address
              </label>
              <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                id="address"
                value={address}
                placeholder="Type Here"
                className="border border-gray-300 rounded w-full px-3 py-2 mt-1 outline-indigo-400 font-light required:"
                required
              />
            </div>
            {/* Select city drop down */}
            <div className="w-full mt-4 max-w-60 mr-auto">
              <label htmlFor="address" className="font-medium text-gray-500">
                City
              </label>
              <select
                onChange={(e) => setCity(e.target.value)}
                value={city}
                id="city"
                className="border border-gray-300 rounded w-full px-3 py-2 mt-1 outline-indigo-400 font-light"
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option value={city}>{city}</option>
                ))}
              </select>
            </div>
            <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default HotelReg;
