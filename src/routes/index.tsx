import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFound";
import AllProducts from "../pages/AllProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      //   {
      //     path: "/login",
      //     element: <Login />,
      //   },
      //   {
      //     path: "/counter",
      //     element: <Counter />,
      //   },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
