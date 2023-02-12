import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        You have successfully placed your order.
      </h1>
      <div>
        <Link to="/">
          <Button color="light" className="mx-auto my-5">
            Go back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
