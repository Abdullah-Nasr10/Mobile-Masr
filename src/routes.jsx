import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";

// ===== Pages =====
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
// import FAQ from "./Pages/FAQ/FAQ";
// { path: "/faq", element: <FAQ /> },
// -----------------------------------------
import AllProducts from "./Pages/Products/AllProducts/AllProducts";
import Category from "./Pages/Products/Category/Category";
import Condition from "./Pages/Products/Condition/Condition";
import ProductDetails from "./Pages/Products/ProductDetails/ProductDetails";
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
import OrderSuccess from "./Pages/OrderSuccess/OrderSuccess";
// -----------------------------------------
import Dashboard from "./Pages/Seller/Dashboard/Dashboard";
import AddProduct from "./Pages/Seller/AddProduct/AddProduct";
import MyProducts from "./Pages/Seller/MyProducts/MyProducts";
import Sales from "./Pages/Seller/Sales/Sales";
// -----------------------------------------

import AdminUsers from "./Pages/Admin/Users/Users";
import AdminProducts from "./Pages/Admin/Products/Products";
import AdminOrders from "./Pages/Admin/Orders/Orders";
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

      { path: "/products", element: <AllProducts /> },
      { path: "/products/category/:category", element: <Category /> },
      { path: "/products/condition/:type", element: <Condition /> },
      { path: "/products/:id", element: <ProductDetails /> },

      { path: "/search", element: <Search /> },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <Profile /> },
      { path: "/orders", element: <Orders /> },
      { path: "/wishlist", element: <Wishlist /> },

      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/order-success", element: <OrderSuccess /> },

      { path: "/seller/dashboard", element: <Dashboard /> },
      { path: "/seller/add-product", element: <AddProduct /> },
      { path: "/seller/my-products", element: <MyProducts /> },
      { path: "/seller/sales", element: <Sales /> },

      { path: "/admin/users", element: <AdminUsers /> },
      { path: "/admin/products", element: <AdminProducts /> },
      { path: "/admin/orders", element: <AdminOrders /> },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
