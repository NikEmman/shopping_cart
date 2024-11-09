import App from "./App";
import StorePage from "./pages/StorePage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

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
    ],
  },
];

export default routes;
