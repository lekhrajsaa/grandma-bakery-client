import React, { createContext, useState } from "react";

export const CartContext = createContext();
// const { user, loading } = useContext(AuthContext);
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");

  //sending total amount
  const sendAmount = (price) => {
    fetch("https://grandma-bakery-server.up.railway.app/cartAmount", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ price: price }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  const authInfo = {
    cart,
    setCart,
    total,
    setTotal,
    coupon,
    setCoupon,
    discount,
    setDiscount,
    sendAmount,
  };
  return (
    <CartContext.Provider value={authInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
