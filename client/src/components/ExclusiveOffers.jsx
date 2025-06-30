import { assets, exclusiveOffers } from "../assets/assets";
import Title from "./Title";

const ExclusiveOffers = () => {
  return (
    <>
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-32">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <Title
            title={"Exclusive Offers"}
            align={"left"}
            subTitle={
              "Take advantage of our limited-time offers & special packages to enhance your stay & create unforgettable memories"
            }
          />
          <button className="flex gap-2 group items-center font-medium cursor-pointer">
            View All Offers
            <img
              className="group-hover:translate-x-1.5 duration-300 ease-linear cursor-pointer "
              src={assets.arrowIcon}
              alt="arrowIcon"
            />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {exclusiveOffers.map((item) => (
            <div
              key={item._id}
              className="group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-16 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${item?.image})` }}
            >
              <p className=" px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
                {item?.priceOff}% OFF
              </p>
              <div>
                <p className="text-2xl font-medium font-playfair">{item?.title}</p>
                <p className="text-sm md:text-base">{item?.description}</p>
                <p className="text-xs text-white/70 mt-3">
                  Expires: {item?.expiryDate}
                </p>
              </div>
              <button className="flex gap-2 items-center font-medium cursor-pointer mt-4 mb-5">
                View Offers
                <img
                  className=" invert group-hover:translate-x-1.5 duration-300 ease-linear transition-all"
                  src={assets.arrowIcon}
                  alt="arrowIcon"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExclusiveOffers;
