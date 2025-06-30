import { UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets.js";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }
    setIsScrolled((prev) => (location.pathname !== "/" ? true : prev));
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0  w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link to={"/"}>
        <img
          src={assets.logo}
          alt="logo"
          className={`h-9 ${isScrolled && "invert opacity-80"}`}
        />
      </Link>
      <UserButton />
    </nav>
  );
};

export default Navbar;
