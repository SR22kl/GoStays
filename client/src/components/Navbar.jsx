import { useAuth, useClerk, UserButton } from "@clerk/clerk-react"; // Import useAuth
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  const { isSignedIn, isLoaded } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const { user, isOwner, setShowHotelReg } = useAppContext();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link to={"/"}>
        <div className="flex items-center gap-2">
          <svg
            className={`w-7 h-7 transition-all duration-500 ${
              isScrolled ? "text-blue-600" : "text-blue-400"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11 3a1 1 0 0 1 1 1v8h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V4a1 1 0 0 1 1-1m0 2v8h-8v7h16v-7h-8V5h-8zm1 5a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-4 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
          </svg>
          <div
            className={`text-2xl font-bold transition-all duration-500 ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            Go<span className="text-blue-500">Stays</span>
          </div>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {link.name}
            <div
              className={`${
                isScrolled ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </a>
        ))}
        {/* Use isSignedIn for conditional rendering here */}
        {isLoaded &&
          isSignedIn && ( // Only show if Clerk is loaded and user is signed in
            <button
              onClick={() =>
                isOwner ? navigate("/owner") : setShowHotelReg(true)
              }
              className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
                isScrolled ? "text-black" : "text-white"
              } transition-all`}
            >
              {isOwner ? "Dashboard" : "List Your Hotel"}
            </button>
          )}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon}
          alt="search"
          className={`${
            isScrolled && "invert text-base "
          }h-7 cursor-pointer transition-all duration-500 `}
        />
        {/* Use isSignedIn for conditional rendering here */}
        {isLoaded ? ( // Check if Clerk is loaded before rendering auth buttons
          isSignedIn ? ( // If signed in, show UserButton
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer"
            >
              Login
            </button>
          )
        ) : (
          <div className="w-24 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        {isLoaded && isSignedIn && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
        <img
          src={assets.menuIcon}
          alt="menuIcon"
          className={`h-6 w-6 cursor-pointer ${isScrolled && "invert"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-6 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src={assets.closeIcon}
            alt="close-menu"
            className="h-6 cursor-pointer"
          />
        </button>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        {isLoaded && isSignedIn && (
          <button
            onClick={() =>
              isOwner ? navigate("/owner") : setShowHotelReg(true)
            }
            className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
          >
            {isOwner ? "Dashboard" : "List Your Hotel"}
          </button>
        )}

        {isLoaded && !isSignedIn && (
          <button
            onClick={openSignIn}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500 cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
