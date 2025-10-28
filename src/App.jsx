import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// admin imports//
import Adminlayout from "./Adminlayout";
import AddCatagory from "./Components/Admin/Pages/AddCatagory";
import ManageCatagory from "./Components/Admin/Pages/ManageCatagory";
import AddProducts from "./Components/Admin/Pages/AddProducts";
import ManageProducts from "./Components/Admin/Pages/ManageProducts";
import DeleteProduct from "./Components/Admin/Pages/DeleteProduct";
import UpdateProduct from "./Components/Admin/Pages/UpdateProduct";
// user imports//

import Layout from "./Layout";
import ProductDetails from "./Components/Users/Pages/ProductDetails";
import Cart from "./Components/Users/Pages/Cart";
import DeleteCart from "./Components/Users/Pages/DeleteCart";
import Checkout from "./Components/Users/Pages/Checkout";
import PaymentSuccess from "./Components/Users/Pages/PaymentSuccess";
import Login from "./Components/Users/Login";
import Register from "./Components/Users/Register";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<Adminlayout></Adminlayout>} />
          <Route path="/admin/add-catagory" element={<AddCatagory />} />
          <Route path="/admin/manage-catagory" element={<ManageCatagory />} />
          <Route path="/admin/add-products" element={<AddProducts />}></Route>
          <Route
            path="/admin/manage-products"
            element={<ManageProducts />}
          ></Route>
          <Route path="/delete-product/:id" element={<DeleteProduct />}></Route>
          <Route path="/update-product/:id" element={<UpdateProduct />}></Route>
        </Routes>
      </Router>

      <Router>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route
            path="/product-details/:id"
            element={<ProductDetails></ProductDetails>}
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/delete-cart/:id" element={<DeleteCart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/payment-success" element={<PaymentSuccess />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </>
  );
}
