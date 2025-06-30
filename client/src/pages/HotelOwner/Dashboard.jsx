import React, { useState } from "react";
import Title from "../../components/Title";
import { assets, dashboardDummyData } from "../../assets/assets";

const Dashboard = () => {
  const [dasboardData, setDashboardData] = useState(dashboardDummyData);

  return (
    <>
      <div className="mt-16">
        <Title
          align={"left"}
          font={"outfit"}
          title={"Dashboard"}
          subTitle={
            "Monitor your room listings, track bookings & analyze revenue-all in one place. Stay updated with real-time insights to ensure smooth operations."
          }
        />
        <div className="flex flex-col  sm:flex-row gap-4 my-8 items-center justify-start">
          {/* Total Bookings */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex p-4 pr-8 items-center justify-center">
            <img
              src={assets.totalBookingIcon}
              alt="Booking Icon"
              className="w-10 h-10"
            />
            <div className="flex flex-col ml-4 font-medium text-center">
              <p className="text-indigo-500 text-lg">Total Bookings</p>
              <p className="text-neutral-400 text-base">
                {dasboardData?.totalBookings}
              </p>
            </div>
          </div>
          {/* Total Revenue */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex p-4 pr-8 items-center justify-center">
            <img
              src={assets.totalRevenueIcon}
              alt="Revenue Icon"
              className="w-10 h-10"
            />
            <div className="flex flex-col ml-4 font-medium text-center">
              <p className="text-indigo-500 text-lg">Total Revenue</p>
              <p className="text-neutral-400 text-base">
                $ {dasboardData?.totalRevenue}
              </p>
            </div>
          </div>
        </div>
        {/* Recent Bookings */}
        <h2 className="text-xl text-violet-950/70 font-medium mb-5">
          Recent Bookings
        </h2>
        <div className="w-full max-w-3xl overflow-x-auto border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                >
                  User Name
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider sm:table-cell hidden"
                >
                  Room Name
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-center text-xs font-medium text-gray-800 uppercase tracking-wider sm:table-cell hidden"
                >
                  Total Amount
                </th>
                <th
                  scope="col"
                  className="py-3 px-4 text-center text-xs font-medium text-gray-800 uppercase tracking-wider"
                >
                  Payment Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {dasboardData.bookings.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {item.user?.image && (
                        <img
                          className="rounded-full w-7 h-7 object-cover"
                          src={item.user.image}
                          alt={item.user.username || "User avatar"}
                        />
                      )}
                      <span className="text-gray-800 truncate">
                        {item.user?.username || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap sm:table-cell hidden">
                    {item.room?.roomType || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-gray-700 whitespace-nowrap text-center sm:table-cell hidden">
                    {item.totalPrice ? `$${item.totalPrice.toFixed(2)}` : "N/A"}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-center">
                    <button
                      className={`text-xs py-1 px-3 rounded-full  ${
                        item.isPaid
                          ? "text-green-600 bg-green-200"
                          : "text-amber-600 bg-yellow-200"
                      }`}
                    >
                      {item.isPaid ? "Completed" : "Pending"}
                    </button>
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

export default Dashboard;
