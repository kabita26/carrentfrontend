import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { BiCartAdd } from "react-icons/bi";
import { LuUser } from "react-icons/lu";
import main_logo from "../../assets/log.png";
import axios from "axios";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { Dropdown } from "react-bootstrap";
import { FaRegHeart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

const SearchBar = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { totalQuantity } = useCart();

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      axios
        .get(`/car/search?searchTerm=${searchTerm}`)
        .then((response) => setCars(response.data.car))
        .catch((error) => console.error("Axios Error:", error));
    } else {
      setCars([]);
    }
  }, [searchTerm]);

  const handleSearchClick = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCarClick = () => {
    setSearchTerm("");
    setCars([]);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 p-2 text-white shadow-md">
      {/* Logo */}
      <NavLink to="/" className="flex items-center">
        <img className="h-8 w-25" src={main_logo} alt="CarHub Nepal" />
      </NavLink>

      {/* Search Bar with increased width */}
      <div className="relative w-1/2">
        <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-lg p-1">
          <input
            type="text"
            placeholder="Search for cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleSearchClick}
            className="w-full p-2 text-gray-700 focus:outline-none rounded-l-lg"
          />
          <button
            type="button"
            onClick={handleSearchClick}
            className="px-2 py-1 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition"
          >
            <IoSearchOutline className="text-lg text-gray-600" />
          </button>
        </form>
        {isActive && cars.length > 0 && (
          <div className="absolute bg-white w-full mt-2 rounded-lg shadow-lg z-20">
            {cars.map((car) => (
              <NavLink
                to={`/carlisting`}
                key={car._id}
                onClick={handleCarClick}
                className="flex items-center p-2 border-b hover:bg-gray-100 transition"
              >
                <img
                  src={car.imageURL}
                  alt={car.name}
                  className="h-10 w-10 object-cover mr-3 rounded"
                />
                <div>
                  <h5 className="text-base font-semibold text-gray-800">{car.name}</h5>
                  <p className="text-xs text-gray-500">{car.brand}</p>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-3">
        {isAuthenticated() ? (
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic" className="text-white">
              <LuUser className="text-xl" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-white text-gray-800">
              <Dropdown.Item href="#" onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <NavLink to="/login" className="text-white">
            <LuUser className="text-xl" />
          </NavLink>
        )}
        <NavLink to="/shopping-cart" className="relative text-white">
          <BiCartAdd className="text-xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {totalQuantity}
          </span>
        </NavLink>
        <NavLink to="/Wishlist" className="text-white">
          <MdOutlineFavoriteBorder className="text-xl" />
        </NavLink>
      </div>

      {/* Mobile Menu Dropdown */}
      <Dropdown>
        <Dropdown.Toggle variant="" id="dropdown-basic" className="text-white">
          <IoMenu className="text-xl" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="bg-white text-gray-800">
          <Dropdown.Item href="/login">
            <LuUser className="text-lg" />
          </Dropdown.Item>
          <Dropdown.Item href="/shopping-cart">
            <BiCartAdd className="text-lg" />
          </Dropdown.Item>
          <Dropdown.Item href="/Wishlist">
            <FaRegHeart className="text-lg" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </header>
  );
};

export default SearchBar;
