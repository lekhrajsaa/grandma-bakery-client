import { Navbar } from "flowbite-react";
import React, { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

const HeadNav = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="m-5">
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand to="/">
          <img
            src="https://i.ibb.co/7NGMq6Y/colorful-cupcakes.jpg"
            className="mr-3 h-6 sm:h-9"
            alt="Colorful cupcake logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">
            Grandma's Bakery
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link
            to="/cart"
            className="relative inline-flex items-center p-3 text-lg font-medium text-center text-white bg-yellow-400 rounded-lg hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300"
          >
            <AiOutlineShoppingCart></AiOutlineShoppingCart>
            <span class="sr-only">Notifications</span>
            <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
              {cart.length}
            </div>
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default HeadNav;
