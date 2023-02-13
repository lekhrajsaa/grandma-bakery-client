import { Button } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";
import CartTable from "../components/CartTable";
import Coupon from "../components/Coupon";
import CheckoutModal from "../components/CheckoutModal";

const CartPage = () => {
  //sharing data using context
  const { total, cart, setCart } = useContext(CartContext);
  const [modalIsOpen, setIsOpen] = useState(false);

  //holding the cart data to send
  const [sendDataObj, setSendDataObj] = useState({
    Total: total,
    Cart: cart,
  });

  //checkout modal open
  const openModal = () => {
    setIsOpen(true);
  };

  //getting cart products from server
  const { refetch } = useQuery({
    queryKey: ["cartProducts"],
    queryFn: async () => {
      const res = await fetch(
        "https://grandma-bakery-server.up.railway.app/cartProducts"
      );
      const data = await res.json();
      setCart(data);
    },
  });

  // const { refetch } = useQuery("cartProducts", () =>
  //   axios
  //     .get("https://grandma-bakery-server.up.railway.app/cartProducts")
  //     .then((res) => res.data)
  //     .then((data) => setCart(data))
  // );

  return (
    <div className="md:w-3/4 mx-auto">
      {cart.length === 0 ? (
        <div>
          <h1 className="text-3xl font-bold">
            You have no product in your cart.
          </h1>
          <div>
            <Link to="/">
              <Button color="light" className="mx-auto my-5">
                Go back
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold mb-4">
            Welcome in your Cart
          </h1>
          <CartTable cart={cart} refetch={refetch}></CartTable>
          <Coupon
            sendDataObj={sendDataObj}
            setSendDataObj={setSendDataObj}
          ></Coupon>
          <div className="mt-3 flex justify-between items-center  mx-3 my-9">
            <div>
              <h1 className="text-xl font-semibold">Total: ${total}</h1>
            </div>
            <Button color="warning" onClick={openModal}>
              Checkout
            </Button>
          </div>
          <CheckoutModal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            sendDataObj={sendDataObj}
          ></CheckoutModal>
        </div>
      )}
    </div>
  );
};

export default CartPage;
