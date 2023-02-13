import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import ProductsCard from "../components/ProductsCard";

const ProductsPage = () => {
  //fetching shop products
  const { isLoading, error, data, isFetching } = useQuery("products", () =>
    axios
      .get("https://grandma-bakery-server.up.railway.app/products")
      .then((res) => res.data)
  );

  //using loader if data is loading while fetch
  if (isLoading) return "Loading...";

  //if fetch gives error
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <div className="grid md:grid-cols-2 mx-5 lg:grid-cols-3 md:mx-20 gap-7">
        {/* using map to get product data one by one */}
        {data.map((product) => (
          <div key={product._id}>
            <ProductsCard product={product}></ProductsCard>
          </div>
        ))}

        <div>{isFetching ? "Updating..." : ""}</div>
      </div>
    </div>
  );
};

export default ProductsPage;
