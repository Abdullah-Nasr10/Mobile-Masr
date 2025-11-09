import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";

// ===== Pages =====
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";

// -----------------------------------------

import Category from "./Pages/Category/Category";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
// -----------------------------------------

import Search from "./Pages/Search/Search";
// -----------------------------------------

import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import Profile from "./Pages/Profile/Profile";
import Orders from "./Pages/Orders/Orders";
import Wishlist from "./Pages/Wishlist/Wishlist";
// -----------------------------------------

import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
// -----------------------------------------

import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
// -----------------------------------------

// ===== Router Config =====
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },

      { path: "category/:category", element: <Category /> },
      { path: "/products/:id", element: <ProductDetails /> },

      { path: "/search", element: <Search /> },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <Profile /> },
      { path: "/orders", element: <Orders /> },
      { path: "/wishlist", element: <Wishlist /> },

      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
