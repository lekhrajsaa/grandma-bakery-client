import axios from "axios";
import { Button, Card } from "flowbite-react";
import React, { useContext } from "react";
import { toast, Toaster } from "react-hot-toast";
import { CartContext } from "../context/CartProvider";

const ProductsCard = ({ product }) => {
  //sharing data using context
  const { setCart, setTotal, total, setCoupon, cart } = useContext(CartContext);

  //adding product data in carts
  const addToCart = (e, product) => {
    e.preventDefault();
    setCart([...cart, product]);
    setTotal(total + parseInt(product.price));

    //adding products for cart and sending them
    fetch("https://grandma-bakery-server.up.railway.app/cartProducts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));

    //toast to notify product added to cart
    toast.success("Successfully added to cart");

    //generating discount coupon for orders more than 5
    if (cart.length > 5) {
      getCoupon();
    }
  };

  //function for generating new coupon
  const getCoupon = () => {
    axios
      .get("https://grandma-bakery-server.up.railway.app/discount")
      .then(function (response) {
        console.log(response.data);
        setCoupon(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Card imgAlt={product.name} imgSrc={product.img} className="h-[550px]">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Price: ${product.price}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {product.description.slice(0, 100) + "..."}
        </p>
        <div className="mx-auto" onClick={(e) => addToCart(e, product)}>
          <Button color="warning">Add to cart</Button>
        </div>
      </Card>
      <Toaster />
    </div>
  );
};

export default ProductsCard;
