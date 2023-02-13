import axios from "axios";
import { Button } from "flowbite-react";
import React, { useContext } from "react";
import { CartContext } from "../context/CartProvider";

const Coupon = ({ sendDataObj, setSendDataObj }) => {
  const { setTotal, total, coupon, setCoupon, setDiscount, discount } =
    useContext(CartContext);

  const addCoupon = (e) => {
    e.preventDefault();
    const discount = total * 0.1;
    const newTotal = parseFloat(parseFloat(total - discount).toFixed(2));
    setTotal(newTotal);
    setDiscount(discount);
    setSendDataObj({ ...sendDataObj, coupon: coupon });
    try {
      axios
        .post("https://grandma-bakery-server.up.railway.app/coupons", {
          coupon: coupon,
        })
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
  return (
    <div>
      {coupon && (
        <div className="flex flex-col md:flex justify-center items-center gap-3 my-3 mx-2 md:mx-0">
          <h1 className="text-xl font-semibold">
            You got a coupon for 10% discount, click on the coupon code to apply
          </h1>
          <Button color="warning" onClick={(e) => addCoupon(e)}>
            {coupon}
          </Button>
        </div>
      )}
      {discount > 0 && (
        <h1 className="text-xl font-semibold">
          You got ${discount} discount
        </h1>
      )}
    </div>
  );
};

export default Coupon;
