import { Button, Table } from "flowbite-react";
import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartProvider";

const CartTable = ({ cart }) => {
  const { setTotal, total, setCart, sendAmount } =
    useContext(CartContext);
  //deleting a product from cart
  const deleteHandler = (e, cartPro) => {
    e.preventDefault();
    fetch("https://grandma-bakery-server.up.railway.app/deleteCartProducts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: cartPro._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
    sendAmount(total - parseFloat(cartPro.price));
  
  };

  useEffect(() => {
    fetch("https://grandma-bakery-server.up.railway.app/cartProducts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCart(data);
      })
      .catch((err) => console.error(err));
  }, [cart, total, setTotal, setCart]);

  return (
    <div>
      <Table hoverable={true} className="my-4 md:my-0">
        <Table.Head>
          <Table.HeadCell>Serial</Table.HeadCell>
          <Table.HeadCell>Product Image</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
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
                <img src={cartPro.img} alt={cartPro.name} className="w-20" />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {cartPro.name}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                ${cartPro.price}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white ">
                <Button
                  color="light"
                  className="mx-auto my-5 lg:-ml-3"
                  onClick={(e) => {
                    deleteHandler(e, cartPro);
                  }}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default CartTable;
