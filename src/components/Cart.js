import axios from "axios";
import { Button, Table } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

const Cart = () => {
  const { setTotal, total, cart, setCart, coupon, setCoupon } =
    useContext(CartContext);

  const navigate = useNavigate();

  const [sendDataObj, setSendDataObj] = useState({
    Total: total,
    Cart: cart,
  });

  const { data } = useQuery("cartProducts", () =>
    axios
      .get("http://localhost:5000/cartProducts")
      .then((res) => res.data)
      .then((data) => setCart(data))
  );

  const addCoupon = (e) => {
    e.preventDefault();
    const discount = total * 0.1;
    const newTotal = parseFloat(parseFloat(total - discount).toFixed(2));
    setTotal(newTotal);
    setSendDataObj({ ...sendDataObj, coupon: coupon });
    try {
      axios
        .post("http://localhost:5000/coupons", { coupon: coupon })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    } finally {
      setCoupon("");
    }
  };

  const sendData = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:5000/cartAllData", sendDataObj)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    } finally {
      setCart([]);
      setTotal(0);
      navigate("/checkout");
    }
  };
  return (
    <div className="w-3/4 mx-auto">
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
          <h1 className="text-4xl font-semibold mb-4">Welcome in your Cart</h1>
          <Table hoverable={true}>
            <Table.Head>
              <Table.HeadCell>Serial</Table.HeadCell>
              <Table.HeadCell>Product Image</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {cart.map((cartPro, i) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={i}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {i + 1}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <img
                      src={cartPro.img}
                      alt={cartPro.name}
                      className="w-20"
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {cartPro.name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    ${cartPro.price}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {coupon && (
            <div className="flex justify-center items-center gap-3 my-3">
              <h1 className="text-xl font-semibold">
                You got a coupon for 10% discount, click on the coupon code to
                apply
              </h1>
              <Button color="warning" onClick={(e) => addCoupon(e)}>
                {coupon}
              </Button>
            </div>
          )}
          <div className="mt-3 flex justify-between items-center">
            <Button
              color="warning"
              onClick={(e) => {
                sendData(e);
              }}
            >
              Checkout
            </Button>
            <h1 className="text-xl font-semibold">Total: ${total}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
