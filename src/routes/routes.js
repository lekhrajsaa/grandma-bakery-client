import { createBrowserRouter } from "react-router-dom";
import Checkout from "../components/Checkout";
import Error404 from "../components/Error404";
import Main from "../layout/Main";
import CartPage from "../pages/CartPage";
import ProductsPage from "../pages/ProductsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <ProductsPage></ProductsPage>,
      },
      {
        path: "/cart",
        element: <CartPage></CartPage>,
      },
      {
        path: "/checkout",
        element: <Checkout></Checkout>,
      },
      {
        path: "*",
        element: <Error404></Error404>,
      },
    ],
  },
]);

export default router;
