import axios from "axios";
import { Button, Card } from "flowbite-react";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { CartContext } from "../context/CartProvider";

const ProductsCard = () => {
  const { setCart, setTotal, total, setCoupon, cart } = useContext(CartContext);

  const { isLoading, error, data, isFetching } = useQuery("products", () =>
    axios.get("http://localhost:5000/products").then((res) => res.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const addToCart = (e, product) => {
    e.preventDefault();
    setCart([...cart, product]);
    setTotal(total + parseInt(product.price));
    axios
      .get("http://localhost:5000/discount")
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
      <div className="grid grid-cols-3 mx-20 gap-7">
        {data.map((product) => (
          <div key={product._id}>
            <div>
              <Card
                imgAlt={product.name}
                imgSrc={product.img}
                className="h-[550px]"
              >
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
            </div>
          </div>
        ))}
        <div>{isFetching ? "Updating..." : ""}</div>
      </div>
    </div>
  );
};

export default ProductsCard;
