import App from "./App";
import StorePage from "./pages/StorePage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "store",
        element: <StorePage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
];

export default routes;
