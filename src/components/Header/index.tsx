import { FC, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import favoritesWhite from "../../assets/img/favorites-white.svg";
import logoWhite from "../../assets/img/logo-white.svg";
import Search from "../Search";
import { useAppDispatch } from "src/redux/store";
import { setSearchValue } from "src/redux/slices/searchMovieSlice";

const Header: FC = () => {
  const location = useLocation();
  const disptach = useAppDispatch();
  // const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrolledDown = prevScrollPos < currentScrollPos;

      // setIsHeaderVisible(!isScrolledDown);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`flex header items-center mb-[40px] ${
        location.pathname === "/favorites"
          ? "justify-center"
          : "justify-between"
      }`}
    >
      {location.pathname !== "/favorites" && (
        <Link
          className={`w-[147px] ${
            location.pathname !== "/" && "flex justify-end"
          }`}
          to={"/favorites"}
        >
          <img src={favoritesWhite} alt="favorites" />
        </Link>
      )}

      <NavLink
        to={"/"}
        className={`flex flex-col text-center no-underline 
        ${location.pathname !== "/" && "order-first"}`}
        onClick={() => {
          disptach(setSearchValue(""));
        }}
      >
        <picture className="block">
          <source
            srcSet={logoWhite}
            width={"55px"}
            media="(max-width: 768px)"
          />
          <img src={logoWhite} alt="logo" />
        </picture>
        <span className="sm:text-customSizeText text-[0px] text-white font-[600]">
          FlixPlus
        </span>
      </NavLink>
      {location.pathname === "/" && <Search />}
    </header>
  );
};

export default Header;
