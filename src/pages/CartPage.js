import axios from "axios";
import { Button } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartProvider";
import CartTable from "../components/CartTable";
import Coupon from "../components/Coupon";

const CartPage = () => {
  //sharing data using context
  const { setTotal, total, cart, setCart } = useContext(CartContext);

  const navigate = useNavigate();

  //holding the cart data to send
  const [sendDataObj, setSendDataObj] = useState({
    Total: total,
    Cart: cart,
  });

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

  //sending checkout data to server
  const sendData = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "https://grandma-bakery-server.up.railway.app/cartAllData",
          sendDataObj
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    } finally {
      clearCartData();
    }
  };

  //clearing cart data
  const clearCartData = () => {
    axios
      .get("https://grandma-bakery-server.up.railway.app/clearCartData")
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setCart([]);
    setTotal(0);
    navigate("/checkout");
  };

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
          <div className="mt-3 flex justify-between items-center mx-3 my-9">
            <h1 className="text-xl font-semibold">Total: ${total}</h1>
            <Button
              color="warning"
              onClick={(e) => {
                sendData(e);
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
