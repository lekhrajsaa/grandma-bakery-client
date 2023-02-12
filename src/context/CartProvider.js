import React, { createContext, useState } from "react";

export const CartContext = createContext();
// const { user, loading } = useContext(AuthContext);
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState("");

  const authInfo = { cart, setCart, total, setTotal, coupon, setCoupon };
  return (
    <CartContext.Provider value={authInfo}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
