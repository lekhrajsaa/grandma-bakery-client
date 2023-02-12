import { createBrowserRouter } from "react-router-dom";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import Error404 from "../components/Error404";
import ProductsCard from "../components/ProductsCard";
import Main from "../layout/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <ProductsCard></ProductsCard>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
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
