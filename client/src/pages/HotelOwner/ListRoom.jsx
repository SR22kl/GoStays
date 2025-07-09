import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user, currency } = useAppContext();

  //Fetch Rooms of the Hotel Owner
  const fetchRooms = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`/api/rooms/owner`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Toggle Availability of the room
  const toggleAvailability = async (roomId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        `/api/rooms/toggle-availability`,
        {
          roomId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchRooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <>
      <div className="mt-16">
        <Title
          align={"left"}
          font={"outfit"}
          title={"Room Listings"}
          subTitle={
            "View, edit or manage all lised rooms. Keep the information up-to-date to provide the best experience for users."
          }
        />
        <p className="text-gray-500 mt-8">All Rooms</p>

        <div className="w-full max-w-3xl overflow-x-auto border border-gray-300 rounded-lg max-h-80 mt-3 overflow-y-scroll">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider sm:table-cell hidden"
                >
                  Facility
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-center text-xs font-medium text-gray-800 uppercase tracking-wider"
                >
                  Price / Night
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-center text-xs font-medium text-gray-800 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {rooms.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-800 font-medium">
                    {item?.roomType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-800 font-medium sm:table-cell hidden">
                    {item?.amenities.join(", ")}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-800 font-medium text-center">
                    {currency}{item?.pricePerNight}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-red-500 font-medium text-center">
                    <label className=" relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        onChange={() => toggleAvailability(item?._id)}
                        type="checkbox"
                        className="sr-only peer"
                        checked={item?.isAvailable}
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-gradient-to-b from-indigo-400 to-indigo-600 transition-colors duration-200"></div>
                      <span className=" dot absolute left-1 top-1  bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListRoom;
