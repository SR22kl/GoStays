import Banner from "../components/Banner";
import ExclusiveOffers from "../components/ExclusiveOffers";
import FeaturedDestination from "../components/FeaturedDestination";
import Newsletter from "../components/NewsLetter";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <>
      <Banner />
      <FeaturedDestination />
      <ExclusiveOffers />
      <Testimonial />
      <Newsletter />
    </>
  );
};

export default Home;
