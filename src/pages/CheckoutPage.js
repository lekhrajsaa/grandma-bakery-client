import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import CheckoutModal from "../components/CheckoutModal";

const CheckoutPage = () => {
  return (
    <div>
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
        <CheckoutModal></CheckoutModal>
      </div>
    </div>
  );
};

export default CheckoutPage;
